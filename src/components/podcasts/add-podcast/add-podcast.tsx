import { isNil } from '@ethang/toolbelt/is/nil';
import { useQuery } from '@tanstack/react-query';

import { tQueryOptions } from '../../../api/query-options/t-query-options';
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

  const { data: text } = useQuery(
    tQueryOptions(['addPodcast', 'feedUrl', 'isSerial', 'title'] as const),
  );

  if (isNil(text)) {
    return null;
  }

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
