import { get } from '@ethang/toolbelt/object/get';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { useQuery } from '@tanstack/react-query';

import { podcastsQueryOptions } from '../../../pages';

type PodcastMarkAsSeenModalProperties = {
  readonly handleUpdate: () => void;
  readonly isLoading: boolean;
  readonly isOpen: boolean;
  readonly onOpenChange: (isOpen: boolean) => void;
  readonly podcastTitle: string;
};

export function PodcastMarkAsSeenModal({
  handleUpdate,
  isLoading,
  isOpen,
  onOpenChange,
  podcastTitle,
}: PodcastMarkAsSeenModalProperties) {
  const { data: text } = useQuery(podcastsQueryOptions.text);

  return (
    <Modal
      classNames={{ closeButton: 'hover:bg-background hover:opacity-75' }}
      className="bg-background"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => {
          return (
            <>
              <ModalHeader>
                {get(text, 'areYouSure', 'Are you sure?')}
              </ModalHeader>
              <ModalBody>
                <p>
                  {get(
                    text,
                    'markAsSeenPrompt',
                    'This episode will be removed from your queue.',
                  )}
                </p>
                <p className="font-bold">{podcastTitle}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  color="primary"
                  onPress={handleUpdate}
                >
                  {get(text, 'markAsSeen', 'Mark as Seen')}
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
}
