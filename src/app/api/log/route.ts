import { HTTP_STATUS } from '@ethang/toolbelt/constants/http';
import { parseFetchJson } from '@ethang/toolbelt/fetch/json';
import z from 'zod';

export async function POST(request: Request) {
  const bodyResults = await parseFetchJson(
    request,
    z.object({
      level: z.string(),
      message: z.string(),
      timestamp: z.string().datetime(),
    }),
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

  return Response.json(
    { data: bodyResults.data },
    {
      headers: { 'Content-Type': 'application/json' },
      status: HTTP_STATUS.OK,
    },
  );
}
