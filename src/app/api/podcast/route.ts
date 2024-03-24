import { parseFetchJson } from '@ethang/toolbelt/fetch/json';
import { tryCatchAsync } from '@ethang/toolbelt/functional/try-catch';
import { isNil } from '@ethang/toolbelt/is/nil';
import { isNumber } from '@ethang/toolbelt/is/number';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { addPodcastSchema } from '../../../schema/add-podcast';
import {
  badRequestResponse,
  internalServerErrorResponse,
  okResponse,
} from '../../../util/api-util';
import { logger } from '../../../util/logger';
import prisma from '../../../util/prisma';
import { PrismaErrorCodes } from '../../../util/prisma-util';
import { TEST_USER } from '../../../util/testing';
import {
  getYouTubeChannelId,
  populateYouTubePodcast,
} from '../../../util/youtube';

export const PODCAST_PAGE_SIZE = 10;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');

  const podcasts = await prisma.userPodcastEpisode.findMany({
    orderBy: { podcastEpisode: { published: 'desc' } },
    select: {
      id: true,
      podcastEpisode: {
        select: {
          id: true,
          podcast: { select: { id: true, youtubeChannelId: true } },
          published: true,
          title: true,
          url: true,
        },
      },
      user: { select: { id: true } },
    },
    skip: isNil(page) || !isNumber(page) ? 0 : Number(page),
    take: PODCAST_PAGE_SIZE,
    where: {
      seen: { not: { equals: true } },
      user: { email: TEST_USER.email },
    },
  });

  if (!isNil(podcasts[0].user)) {
    for (const item of podcasts) {
      if (!isNil(item.podcastEpisode.podcast.youtubeChannelId)) {
        populateYouTubePodcast(
          item.podcastEpisode.podcast.youtubeChannelId,
          item.podcastEpisode.podcast.id,
          item.user.id,
        ).catch((error: unknown) => {
          logger.error(error);
        });
      }
    }
  }

  return okResponse(podcasts);
}

export async function POST(request: Request) {
  const bodyResults = await parseFetchJson(request, addPodcastSchema);

  if (!bodyResults.isSuccess) {
    return badRequestResponse(bodyResults.error);
  }

  const user = await tryCatchAsync(async () => {
    return prisma.user.update({
      data: {
        subscriptions: {
          connectOrCreate: {
            create: {
              ...bodyResults.data,
              youtubeChannelId: await getYouTubeChannelId(
                bodyResults.data.feedUrl,
              ),
            },
            where: { feedUrl: bodyResults.data.feedUrl },
          },
        },
      },
      where: { email: TEST_USER.email },
    });
  });

  if (!user.isSuccess) {
    let errorMessage = 'Failed to create podcast';
    if (
      user.error instanceof PrismaClientKnownRequestError &&
      user.error.code === PrismaErrorCodes.UNIQUE_CONSTRAINT
    ) {
      errorMessage = 'Podcast already exists';
    }

    return internalServerErrorResponse(errorMessage);
  }

  return okResponse(bodyResults.data);
}
