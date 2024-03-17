import { HTTP_STATUS } from '@ethang/toolbelt/constants/http';
import { parseFetchJson } from '@ethang/toolbelt/fetch/json';
import { tryCatchAsync } from '@ethang/toolbelt/functional/try-catch';
import z from 'zod';

import prisma from '../../../util/prisma';

export async function POST(request: Request) {
  const bodyResults = await parseFetchJson(
    request,
    z.array(
      z.object({
        level: z.string(),
        message: z.string(),
        timestamp: z.string().datetime(),
      }),
    ),
  );

  if (!bodyResults.isSuccess) {
    return Response.json(
      { error: bodyResults.error },
      {
        headers: { 'Content-Type': 'application/json' },
        status: HTTP_STATUS.BAD_REQUEST,
      },
    );
  }

  const log = await tryCatchAsync(async () => {
    return prisma.log.createMany({
      data: bodyResults.data,
    });
  });

  if (!log.isSuccess) {
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
