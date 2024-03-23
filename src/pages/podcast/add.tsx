import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { AddPodcast } from '../../components/podcasts/add-podcast/add-podcast';
import { MainLayout } from '../../layouts/main-layout';
import { getT } from '../../util/i18n';

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const t = await getT(req);

  return {
    props: {
      text: {
        addPodcast: t('addPodcast'),
        feedUrl: t('feedUrl'),
        isSerial: t('isSerial'),
        submit: t('submit'),
        title: t('title'),
      },
    },
  };
}

export default function Add({
  text,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <MainLayout>
      <AddPodcast text={text} />
    </MainLayout>
  );
}
