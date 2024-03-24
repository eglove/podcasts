import { useQuery } from '@tanstack/react-query';

import { podcastsQueryOptions } from '../../../pages';
import { Podcast } from './podcast';

export function Podcasts() {
  const { data: podcasts } = useQuery(podcastsQueryOptions.podcasts);

  return (
    <div className="my-4 grid gap-4">
      {podcasts?.map(podcast => {
        return <Podcast key={podcast.id} podcast={podcast} />;
      })}
    </div>
  );
}
