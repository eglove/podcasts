import { useForm } from '@ethang/hooks/use-form';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { addPodcastSchema } from '../../../schema/add-podcast';

export function useAddPodcast() {
  const { mutate, isPending } = useMutation({
    async mutationFn() {
      return fetch('/api/podcast', {
        body: JSON.stringify(formState),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
    },
    mutationKey: ['addPodcast'],
  });

  const { handleSubmit, validate, fieldErrors, setValue, formState } = useForm(
    { feedUrl: '', isSerial: false, title: '' },
    {
      onSubmit() {
        mutate();
      },
      zodValidator: addPodcastSchema,
    },
  );

  const handleSetValue = useCallback(
    (name: keyof typeof formState) => {
      return (value: boolean | string) => {
        setValue(name, value);
      };
    },
    [setValue],
  );

  return {
    fieldErrors,
    formState,
    handleSetValue,
    handleSubmit,
    isPending,
    validate,
  };
}
