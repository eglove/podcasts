import { AddPodcast } from '../components/podcasts/add-podcast/add-podcast';
import { MainLayout } from '../layouts/main-layout';

export default function Home() {
  return (
    <MainLayout>
      <AddPodcast />
    </MainLayout>
  );
}
