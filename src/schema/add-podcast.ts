import z from 'zod';

export const addPodcastSchema = z.object({
  feedUrl: z.string().min(1, 'This field is required').url(),
  isSerial: z.boolean(),
});

export const addPodcastResponseSchema = z.object({
  feedUrl: z.string(),
  id: z.string(),
  isSerial: z.boolean(),
  title: z.string(),
});
