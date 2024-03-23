import type { FieldErrors } from '@ethang/hooks/use-form';
import { Button, Checkbox, Input } from '@nextui-org/react';
import type { FormEvent } from 'react';
import type z from 'zod';

import type { addPodcastSchema } from '../../../schema/add-podcast';

type AddPodcastLayoutProperties = {
  readonly fieldErrors: FieldErrors<z.output<typeof addPodcastSchema>>;
  readonly formState: z.output<typeof addPodcastSchema>;
  readonly handleSetValue: (
    name: keyof z.output<typeof addPodcastSchema>,
  ) => (value: boolean | string) => void;
  readonly handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  readonly isPending: boolean;
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
  formState,
  handleSetValue,
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
          onValueChange={handleSetValue('isSerial')}
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
              onValueChange={handleSetValue(typedKey)}
            />
          );
        })}
        <Button
          className="text-white"
          color="primary"
          isLoading={isPending}
          type="submit"
          onPress={validate}
        >
          {text.submit}
        </Button>
      </form>
    </>
  );
}
