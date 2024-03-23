import { Api } from '@ethang/toolbelt/api/api';

import {
  addPodcastResponseSchema,
  addPodcastSchema,
} from '../schema/add-podcast';

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
  },
});
