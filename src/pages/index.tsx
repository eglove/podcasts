import { dehydrate } from '@tanstack/react-query';

import { tQueryOptions } from '../api/query-options/t-query-options';
import { AddPodcast } from '../components/podcasts/add-podcast/add-podcast';
import { MainLayout } from '../layouts/main-layout';
import { queryClient } from './_app';

export const podcastsQueryOptions = {
  text: tQueryOptions(['addPodcast', 'feedUrl', 'isSerial', 'title'] as const),
};

export const getServerSideProps = async () => {
  await queryClient.prefetchQuery(podcastsQueryOptions.text);

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
    </MainLayout>
  );
}
