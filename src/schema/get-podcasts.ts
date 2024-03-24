import z from 'zod';

export const getPodcastsResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      podcastEpisode: z.object({
        id: z.string(),
        podcast: z.object({ id: z.string(), youtubeChannelId: z.string() }),
        published: z.string(),
        title: z.string(),
        url: z.string(),
      }),
      user: z.object({ id: z.string() }),
    }),
  ),
});
