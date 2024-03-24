import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { isNil } from '@ethang/toolbelt/is/nil';
import { get } from '@ethang/toolbelt/object/get';
import { Button } from '@nextui-org/button';
import { dehydrate, useQuery } from '@tanstack/react-query';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import { getPodcastOptions } from '../api/query-options/podcast-options';
import { tQueryOptions } from '../api/query-options/t-query-options';
import { AddPodcast } from '../components/podcasts/add-podcast/add-podcast';
import { MainLayout } from '../layouts/main-layout';
import { queryClient } from './_app';

export const podcastsQueryOptions = {
  podcasts: getPodcastOptions(),
  text: tQueryOptions([
    'addPodcast',
    'feedUrl',
    'isSerial',
    'title',
    'markAsSeen',
  ] as const),
};

export const getServerSideProps = async () => {
  await Promise.all([
    queryClient.prefetchQuery(podcastsQueryOptions.podcasts),
    queryClient.prefetchQuery(podcastsQueryOptions.text),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const { data } = useQuery(podcastsQueryOptions.podcasts);
  const { data: text } = useQuery(podcastsQueryOptions.text);

  return (
    <MainLayout>
      <AddPodcast />
      <div className="my-4 grid gap-4">
        {data?.map(podcast => {
          const url = new URL(podcast.podcastEpisode.url);

          let id: string | null = null;
          if (url.hostname.includes('youtube.com')) {
            id = url.searchParams.get('v');
          }

          if (!isNil(id)) {
            return (
              <div key={id} className="grid gap-2">
                <h2>{podcast.podcastEpisode.title}</h2>
                <LiteYouTubeEmbed
                  id={id}
                  title={podcast.podcastEpisode.title}
                />
                <Button
                  className="w-max justify-self-end"
                  color="secondary"
                  size="sm"
                >
                  {get(text, 'markAsSeen', 'Mark as Seen')}
                </Button>
              </div>
            );
          }

          return (
            <div key={podcast.podcastEpisode.id}>
              <div>{podcast.podcastEpisode.title}</div>
              <div>{podcast.podcastEpisode.url}</div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}
