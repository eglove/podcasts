import { useForm } from '@ethang/hooks/use-form';
import { getRequestKeys } from '@ethang/toolbelt/http/request';
import { useMutation } from '@tanstack/react-query';

import { api } from '../../../api/api';
import { invalidateGetPodcast } from '../../../api/query-options/podcast-options';
import { addPodcastSchema } from '../../../schema/add-podcast';
import { getResponseError } from '../../../util/http';

export function useAddPodcast() {
  const podcastCreateRequest = api.request.podcastCreate();

  const { mutate, isPending } = useMutation({
    async mutationFn() {
      return api.fetch.podcastCreate({
        requestInit: { body: JSON.stringify(formState) },
      });
    },
    mutationKey: podcastCreateRequest.isSuccess
      ? getRequestKeys(podcastCreateRequest.data)
      : [],
    async onSuccess(response) {
      await invalidateGetPodcast();
      const message = await getResponseError(response);
      setFormError(message);
    },
  });

  const {
    handleSubmit,
    validate,
    fieldErrors,
    setValue,
    formState,
    formError,
    setFormError,
  } = useForm(
    { feedUrl: '', isSerial: false },
    {
      onSubmit() {
        mutate();
      },
      zodValidator: addPodcastSchema,
    },
  );

  return {
    fieldErrors,
    formError,
    formState,
    handleSubmit,
    isPending,
    setValue,
    validate,
  };
}
