import z from 'zod';

export const updateUserPodcastEpisodeSchema = z.object({
  id: z.string(),
  seen: z.boolean(),
});
