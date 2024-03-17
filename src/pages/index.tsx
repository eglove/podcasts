import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { MainLayout } from '../layouts/main-layout';
import { getT } from '../util/i18n';

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const t = await getT(req);

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
