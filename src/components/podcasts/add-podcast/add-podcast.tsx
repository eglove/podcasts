import { useQuery } from '@tanstack/react-query';

import { podcastsQueryOptions } from '../../../pages';
import { AddPodcastLayout } from './add-podcast-layout';
import { useAddPodcast } from './use-add-podcast';

export function AddPodcast() {
  const {
    formError,
    validate,
    fieldErrors,
    setValue,
    handleSubmit,
    formState,
    isPending,
  } = useAddPodcast();

  const { data: text } = useQuery(podcastsQueryOptions.text);

  return (
    <AddPodcastLayout
      formError={formError}
      validate={validate}
      fieldErrors={fieldErrors}
      setValue={setValue}
      handleSubmit={handleSubmit}
      formState={formState}
      isPending={isPending}
      text={text}
    />
  );
}
