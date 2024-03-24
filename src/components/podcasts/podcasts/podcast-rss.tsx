import type { PodcastProperties } from './podcast';

export function PodcastRss({ podcast }: PodcastProperties) {
  return (
    <div>
      <div>{podcast.podcastEpisode.title}</div>
      <div>{podcast.podcastEpisode.url}</div>
    </div>
  );
}
