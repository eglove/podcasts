import { HTTP_STATUS } from '@ethang/toolbelt/constants/http';
import { parseFetchJson } from '@ethang/toolbelt/fetch/json';
import { tryCatchAsync } from '@ethang/toolbelt/functional/try-catch';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { addPodcastSchema } from '../../../schema/add-podcast';
import prisma from '../../../util/prisma';
import { PrismaErrorCodes } from '../../../util/prisma-util';

export async function POST(request: Request) {
  const bodyResults = await parseFetchJson(request, addPodcastSchema);

  if (!bodyResults.isSuccess) {
    return Response.json(
      { error: bodyResults.error },
      {
        headers: { 'Content-Type': 'application/json' },
        status: HTTP_STATUS.BAD_REQUEST,
      },
    );
  }

  const podcast = await tryCatchAsync(async () => {
    return prisma.podcast.create({
      data: bodyResults.data,
      select: { feedUrl: true, id: true, isSerial: true, title: true },
    });
  });

  if (!podcast.isSuccess) {
    let errorMessage = 'Failed to create podcast';
    if (
      podcast.error instanceof PrismaClientKnownRequestError &&
      podcast.error.code === PrismaErrorCodes.UNIQUE_CONSTRAINT
    ) {
      errorMessage = 'Podcast already exists';
    }

    return Response.json(
      { error: errorMessage },
      {
        headers: { 'Content-Type': 'application/json' },
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      },
    );
  }

  return Response.json(
    { data: bodyResults.data },
    {
      headers: { 'Content-Type': 'application/json' },
      status: HTTP_STATUS.OK,
    },
  );
}
