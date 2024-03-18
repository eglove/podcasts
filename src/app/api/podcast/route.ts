import { HTTP_STATUS } from '@ethang/toolbelt/constants/http';
import { parseFetchJson } from '@ethang/toolbelt/fetch/json';
import { tryCatchAsync } from '@ethang/toolbelt/functional/try-catch';

import { addPodcastSchema } from '../../../schema/add-podcast';
import prisma from '../../../util/prisma';

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
    });
  });

  if (!podcast.isSuccess) {
    return Response.json(
      { error: 'failed to create log' },
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
