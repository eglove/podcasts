import { parseFetchJson } from '@ethang/toolbelt/fetch/json';
import { tryCatchAsync } from '@ethang/toolbelt/functional/try-catch';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { parse } from 'node-html-parser';

import { addPodcastSchema } from '../../../schema/add-podcast';
import {
  badRequestResponse,
  internalServerErrorResponse,
  okResponse,
} from '../../../util/api-util';
import prisma from '../../../util/prisma';
import { PrismaErrorCodes } from '../../../util/prisma-util';
import { TEST_USER } from '../../../util/testing';

export async function POST(request: Request) {
  const bodyResults = await parseFetchJson(request, addPodcastSchema);

  if (!bodyResults.isSuccess) {
    return badRequestResponse(bodyResults.error);
  }

  const url = new URL(bodyResults.data.feedUrl);
  let youtubeChannelId: string | undefined;
  if (url.hostname.includes('youtube.com')) {
    const response = await fetch(url);
    const data = await response.text();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const parsed = parse(data);
    const meta = parsed.querySelector('meta[itemprop="identifier"]');
    youtubeChannelId = meta?.getAttribute('content') ?? undefined;
  }

  const user = await tryCatchAsync(async () => {
    return prisma.user.update({
      data: {
        subscriptions: {
          connectOrCreate: {
            create: { ...bodyResults.data, youtubeChannelId },
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
