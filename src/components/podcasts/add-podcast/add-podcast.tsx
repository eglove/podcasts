import { AddPodcastLayout } from './add-layout';
import { useAddPodcast } from './use-add-podcast';

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
  const {
    formError,
    validate,
    fieldErrors,
    setValue,
    handleSubmit,
    formState,
    isPending,
  } = useAddPodcast();

  return (
    <AddPodcastLayout
      formError={formError}
      validate={validate}
      fieldErrors={fieldErrors}
      serValue={setValue}
      handleSubmit={handleSubmit}
      formState={formState}
      isPending={isPending}
      text={text}
    />
  );
}
