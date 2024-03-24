import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { dehydrate } from '@tanstack/react-query';

import { getPodcastOptions } from '../api/query-options/podcast-options';
import { tQueryOptions } from '../api/query-options/t-query-options';
import { AddPodcast } from '../components/podcasts/add-podcast/add-podcast';
import { Podcasts } from '../components/podcasts/podcasts/podcasts';
import { MainLayout } from '../layouts/main-layout';
import { queryClient } from './_app';

export const podcastsQueryOptions = {
  podcasts: getPodcastOptions(),
  text: tQueryOptions([
    'addPodcast',
    'areYouSure',
    'close',
    'feedUrl',
    'isSerial',
    'title',
    'markAsSeen',
    'markAsSeenPrompt',
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
  return (
    <MainLayout>
      <AddPodcast />
      <Podcasts />
    </MainLayout>
  );
}
