import { parseFetchJson } from '@ethang/toolbelt/fetch/json';
import { tryCatchAsync } from '@ethang/toolbelt/functional/try-catch';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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

  const user = await tryCatchAsync(async () => {
    return prisma.user.update({
      data: {
        subscriptions: {
          connectOrCreate: {
            create: bodyResults.data,
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
