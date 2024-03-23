import { Api } from '@ethang/toolbelt/api/api';
import z from 'zod';

import {
  addPodcastResponseSchema,
  addPodcastSchema,
} from '../schema/add-podcast';
import { tResponseSchema } from '../schema/t-request';

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  cacheInterval: 60,
  defaultRequestInit: { headers: { 'Content-Type': 'application/json' } },
  requests: {
    podcastCreate: {
      bodySchema: addPodcastSchema,
      defaultRequestInit: { method: 'POST' },
      path: 'api/podcast',
      responseSchema: addPodcastResponseSchema,
    },
    t: {
      path: 'api/t',
      responseSchema: tResponseSchema,
      searchParamSchema: z.object({ t: z.array(z.string()) }),
    },
  },
});
