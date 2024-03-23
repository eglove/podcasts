import { parseFetchJson } from '@ethang/toolbelt/fetch/json';
import { getRequestKeys } from '@ethang/toolbelt/http/request';
import { isNil } from '@ethang/toolbelt/is/nil';
import type { QueryOptions } from '@tanstack/react-query';

import { getPodcastsResponseSchema } from '../../schema/get-podcasts';
import { api } from '../api';

export function getPodcastOptions() {
  const requestResult = api.request.podcastGet();

  if (requestResult.isSuccess) {
    return {
      async queryFn() {
        const responseResult = await api.fetch.podcastGet();

        if (!responseResult.isSuccess) {
          return;
        }

        if (!isNil(responseResult.data)) {
          const bodyResult = await parseFetchJson(
            responseResult.data,
            getPodcastsResponseSchema,
          );

          if (bodyResult.isSuccess) {
            return bodyResult.data.data;
          }
        }
      },
      queryKey: getRequestKeys(requestResult.data),
    } satisfies QueryOptions;
  }

  return { queryKey: [] } satisfies QueryOptions;
}
