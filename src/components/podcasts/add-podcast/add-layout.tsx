import type { FieldErrors } from '@ethang/hooks/use-form';
import { isNil } from '@ethang/toolbelt/is/nil';
import { Checkbox, Input } from '@nextui-org/react';
import type { FormEvent } from 'react';
import type z from 'zod';

import type { addPodcastSchema } from '../../../schema/add-podcast';
import { PrimaryButton } from '../../common/primary-button';

type AddPodcastLayoutProperties = {
  readonly fieldErrors: FieldErrors<z.output<typeof addPodcastSchema>>;
  readonly formError?: string;
  readonly formState: z.output<typeof addPodcastSchema>;
  readonly handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  readonly isPending: boolean;
  readonly serValue: (
    name: keyof z.output<typeof addPodcastSchema>,
  ) => (value: boolean | string) => void;
  readonly text: {
    addPodcast: string;
    feedUrl: string;
    isSerial: string;
    submit: string;
    title: string;
  };
  readonly validate: () => boolean;
};

export function AddPodcastLayout({
  fieldErrors,
  formError,
  formState,
  serValue,
  validate,
  text,
  isPending,
  handleSubmit,
}: AddPodcastLayoutProperties) {
  return (
    <>
      <h1 className="my-4 text-3xl font-bold">{text.addPodcast}</h1>
      <form className="grid max-w-md gap-4" onSubmit={handleSubmit}>
        <Checkbox
          disabled={isPending}
          isSelected={formState.isSerial}
          onValueChange={serValue('isSerial')}
        >
          {text.isSerial}
        </Checkbox>
        {['title', 'feedUrl'].map(key => {
          const typedKey = key as keyof typeof formState;

          return (
            <Input
              key={typedKey}
              isRequired
              disabled={isPending}
              value={formState[typedKey] as string}
              errorMessage={fieldErrors?.[typedKey]?.[0]}
              label={text[typedKey]}
              onValueChange={serValue(typedKey)}
            />
          );
        })}
        {!isNil(formError) && (
          <p className="text-sm text-danger">{formError}</p>
        )}
        <PrimaryButton isLoading={isPending} type="submit" onPress={validate}>
          {text.submit}
        </PrimaryButton>
      </form>
    </>
  );
}
