import { parseFetchJson } from '@ethang/toolbelt/fetch/json';
import { getRequestKeys } from '@ethang/toolbelt/http/request';
import { isNil } from '@ethang/toolbelt/is/nil';
import type { QueryOptions } from '@tanstack/react-query';

import { tResponseSchema } from '../../schema/t-request';
import { api } from '../api';

export function tQueryOptions<T extends string[]>(keys: T) {
  const requestOptions = { searchParams: { t: keys } };
  const requestData = api.request.t(requestOptions);

  if (requestData.isSuccess) {
    return {
      async queryFn() {
        const responseResult = await api.fetch.t(requestOptions);

        if (!responseResult.isSuccess) {
          return;
        }

        if (!isNil(responseResult.data)) {
          const bodyResult = await parseFetchJson(
            responseResult.data,
            tResponseSchema,
          );

          if (bodyResult.isSuccess) {
            return bodyResult.data as Record<(typeof keys)[number], string>;
          }
        }
      },
      queryKey: getRequestKeys(requestData.data),
    } satisfies QueryOptions;
  }

  return { queryKey: [] } satisfies QueryOptions;
}
