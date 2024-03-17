import type { InferGetServerSidePropsType } from 'next';

import { MainLayout } from '../layouts/main-layout';
import { i18next } from '../util/i18n';

export async function getServerSideProps() {
  const t = await i18next;

  return {
    props: {
      hello: t('hello'),
    },
  };
}

export default function Home({
  hello,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <MainLayout>
      <p className="bg-red-500 text-white">{hello}</p>
    </MainLayout>
  );
}
