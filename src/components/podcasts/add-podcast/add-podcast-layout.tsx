import type { FieldErrors } from '@ethang/hooks/use-form';
import { isNil } from '@ethang/toolbelt/is/nil';
import type { FormEvent } from 'react';
import type z from 'zod';

import type { addPodcastSchema } from '../../../schema/add-podcast';
import { AddPodcastCheckButton } from './add-podcast-check-button';
import { AddPodcastTextInputs } from './add-podcast-text-inputs';

export type AddPodcastLayoutProperties = {
  readonly fieldErrors: FieldErrors<z.output<typeof addPodcastSchema>>;
  readonly formError?: string;
  readonly formState: z.output<typeof addPodcastSchema>;
  readonly handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  readonly isPending: boolean;
  readonly setValue: (
    name: keyof z.output<typeof addPodcastSchema>,
  ) => (value: boolean | string) => void;
  readonly text: {
    addPodcast: string;
    feedUrl: string;
    isSerial: string;
    title: string;
  };
  readonly validate: () => boolean;
};

export function AddPodcastLayout({
  fieldErrors,
  formError,
  formState,
  setValue,
  validate,
  text,
  isPending,
  handleSubmit,
}: AddPodcastLayoutProperties) {
  return (
    <>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <AddPodcastTextInputs
          text={text}
          setValue={setValue}
          fieldErrors={fieldErrors}
          formState={formState}
          isPending={isPending}
        />
        <AddPodcastCheckButton
          isPending={isPending}
          formState={formState}
          setValue={setValue}
          text={text}
          validate={validate}
        />
      </form>
      {!isNil(formError) && (
        <p className="py-1 text-end text-sm text-danger">{formError}</p>
      )}
    </>
  );
}
