import { isNil } from '@ethang/toolbelt/is/nil';
import type z from 'zod';

import type { getPodcastsResponseSchema } from '../../../schema/get-podcasts';
import { PodcastRss } from './podcast-rss';
import { PodcastYoutube } from './podcast-youtube';

export type PodcastProperties = {
  readonly podcast: z.output<typeof getPodcastsResponseSchema>['data'][0];
};

export function Podcast({ podcast }: PodcastProperties) {
  const url = new URL(podcast.podcastEpisode.url);

  let id: string | null = null;
  if (url.hostname.includes('youtube.com')) {
    id = url.searchParams.get('v');
  }

  if (!isNil(id)) {
    return <PodcastYoutube podcast={podcast} youtubeId={id} />;
  }

  return <PodcastRss podcast={podcast} />;
}
