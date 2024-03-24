import { get } from '@ethang/toolbelt/object/get';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { useQuery } from '@tanstack/react-query';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import { podcastsQueryOptions } from '../../../pages';
import type { PodcastProperties } from './podcast';
import { PodcastMarkAsSeenModal } from './podcast-mark-as-seen-modal';
import { useMarkAsSeen } from './use-mark-as-seen';

type PodcastYoutubeProperties = PodcastProperties & {
  readonly youtubeId: string;
};

export function PodcastYoutube({
  podcast,
  youtubeId,
}: PodcastYoutubeProperties) {
  const { data: text } = useQuery(podcastsQueryOptions.text);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { isPending, handleUpdate } = useMarkAsSeen({
    onSuccess: onClose,
    podcastId: podcast.id,
  });

  return (
    <div key={podcast.id} className="grid gap-2">
      <h2>{podcast.podcastEpisode.title}</h2>
      <LiteYouTubeEmbed id={youtubeId} title={podcast.podcastEpisode.title} />
      <Button
        className="w-max justify-self-end"
        color="secondary"
        size="sm"
        onPress={onOpen}
      >
        {get(text, 'markAsSeen', 'Mark as Seen')}
      </Button>
      <PodcastMarkAsSeenModal
        handleUpdate={handleUpdate}
        isLoading={isPending}
        isOpen={isOpen}
        podcastTitle={podcast.podcastEpisode.title}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
