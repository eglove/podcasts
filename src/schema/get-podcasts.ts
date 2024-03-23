import z from 'zod';

export const getPodcastsResponseSchema = z.object({
  data: z.object({
    id: z.string(),
    subscriptions: z.array(
      z.object({
        id: z.string(),
        podcastEpisodes: z.array(
          z.object({
            id: z.string(),
            published: z.string(),
            title: z.string(),
            url: z.string(),
          }),
        ),
        title: z.string(),
        youtubeChannelId: z.string(),
      }),
    ),
  }),
});
