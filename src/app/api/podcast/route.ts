import { parseFetchJson } from '@ethang/toolbelt/fetch/json';
import { tryCatchAsync } from '@ethang/toolbelt/functional/try-catch';
import { isNil } from '@ethang/toolbelt/is/nil';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DateTime } from 'luxon';

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

export async function GET() {
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      subscriptions: {
        select: {
          id: true,
          podcastEpisodes: {
            orderBy: { published: 'desc' },
            select: { id: true, published: true, title: true, url: true },
          },
          title: true,
          youtubeChannelId: true,
        },
      },
    },
    where: { email: TEST_USER.email },
  });

  if (!isNil(user)) {
    user.subscriptions.sort((a, b) => {
      const [latestA] = a.podcastEpisodes;
      const [latestB] = b.podcastEpisodes;

      if (isNil(latestA) || isNil(latestB)) {
        return 0;
      }

      const timestampA = DateTime.fromJSDate(latestA.published).toMillis();
      const timestampB = DateTime.fromJSDate(latestB.published).toMillis();
      return timestampB - timestampA;
    });

    for (const subscription of user.subscriptions) {
      if (!isNil(subscription.youtubeChannelId)) {
        populateYouTubePodcast(
          subscription.youtubeChannelId,
          subscription.id,
          user.id,
        ).catch((error: unknown) => {
          logger.error(error);
        });
      }
    }
  }

  return okResponse(user);
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
