import { useForm } from '@ethang/hooks/use-form';
import { useMutation } from '@tanstack/react-query';

import { api } from '../../../api/api';
import { addPodcastSchema } from '../../../schema/add-podcast';
import { getResponseError } from '../../../util/http';

export function useAddPodcast() {
  const { mutate, isPending } = useMutation({
    async mutationFn() {
      return api.fetch.podcastCreate({
        requestInit: { body: JSON.stringify(formState) },
      });
    },
    mutationKey: ['addPodcast'],
    async onSuccess(response) {
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
    { feedUrl: '', isSerial: false, title: '' },
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
