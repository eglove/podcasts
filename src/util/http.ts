import { cacheBust } from '@ethang/toolbelt/fetch/cache-bust';
import { parseFetchJson } from '@ethang/toolbelt/fetch/json';
import type { HandledError } from '@ethang/toolbelt/types/error';
import z from 'zod';

export async function getResponseError(
  response: HandledError<Response | undefined, Error>,
) {
  if (!response.isSuccess) {
    return response.error.message;
  }

  if (response.data?.ok === false) {
    const data = await parseFetchJson(
      response.data,
      z.object({ error: z.string() }),
    );

    if (data.isSuccess) {
      return data.data.error;
    }

    return response.data.statusText;
  }
}

export async function cacheBustRequest(request: HandledError<Request, Error>) {
  if (request.isSuccess) {
    await cacheBust(request.data);
  }
}
