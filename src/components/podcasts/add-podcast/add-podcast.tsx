import { useForm } from '@ethang/hooks/use-form';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { addPodcastSchema } from '../../../schema/add-podcast';
import { AddPodcastLayout } from './add-layout';

type AddPodcastProperties = {
  readonly text: {
    addPodcast: string;
    feedUrl: string;
    isSerial: string;
    submit: string;
    title: string;
  };
};

export function AddPodcast({ text }: AddPodcastProperties) {
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

  return (
    <AddPodcastLayout
      validate={validate}
      fieldErrors={fieldErrors}
      handleSetValue={handleSetValue}
      handleSubmit={handleSubmit}
      formState={formState}
      isPending={isPending}
      text={text}
    />
  );
}
