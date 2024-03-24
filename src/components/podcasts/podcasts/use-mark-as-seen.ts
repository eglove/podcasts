import { getRequestKeys } from '@ethang/toolbelt/http/request';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { api } from '../../../api/api';
import { invalidateGetPodcast } from '../../../api/query-options/podcast-options';

type UseMarkAsSeenProperties = {
  onSuccess: () => void;
  podcastId: string;
};

export function useMarkAsSeen({
  onSuccess,
  podcastId,
}: UseMarkAsSeenProperties) {
  const updateUserPodcastEpisodeRequest =
    api.request.userPodcastEpisodeUpdate();

  const { mutate, isPending } = useMutation({
    async mutationFn() {
      return api.fetch.userPodcastEpisodeUpdate({
        requestInit: { body: JSON.stringify({ id: podcastId, seen: true }) },
      });
    },
    mutationKey: updateUserPodcastEpisodeRequest.isSuccess
      ? getRequestKeys(updateUserPodcastEpisodeRequest.data)
      : [],
    async onSuccess() {
      await invalidateGetPodcast();
      onSuccess();
    },
  });

  const handleUpdate = useCallback(() => {
    mutate();
  }, [mutate]);

  return { handleUpdate, isPending };
}
