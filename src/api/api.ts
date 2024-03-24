import { Api } from '@ethang/toolbelt/api/api';
import z from 'zod';

import {
  addPodcastResponseSchema,
  addPodcastSchema,
} from '../schema/add-podcast';
import { getPodcastsResponseSchema } from '../schema/get-podcasts';
import { tResponseSchema } from '../schema/t-request';
import { updateUserPodcastEpisodeSchema } from '../schema/update-user-podcast-episode';

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
    podcastGet: {
      defaultRequestInit: { method: 'GET' },
      path: 'api/podcast',
      responseSchema: getPodcastsResponseSchema,
    },
    t: {
      path: 'api/t',
      responseSchema: tResponseSchema,
      searchParamSchema: z.object({ t: z.array(z.string()) }),
    },
    userPodcastEpisodeDelete: {
      defaultRequestInit: { method: 'DELETE' },
      path: 'api/user-podcast-episode',
      responseSchema: z.object({ id: z.string() }),
      searchParamSchema: z.object({ id: z.string() }),
    },
    userPodcastEpisodeUpdate: {
      defaultRequestInit: { method: 'PUT' },
      path: 'api/user-podcast-episode',
      responseSchema: z.object({ id: z.string() }),
      searchParamSchema: updateUserPodcastEpisodeSchema,
    },
  },
});
