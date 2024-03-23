import { Input } from '@nextui-org/react';

import type { AddPodcastLayoutProperties } from './add-podcast-layout';

type AddPodcastTextInputsProperties = Pick<
  AddPodcastLayoutProperties,
  'fieldErrors' | 'formState' | 'isPending' | 'setValue' | 'text'
>;

export function AddPodcastTextInputs({
  text,
  setValue,
  isPending,
  formState,
  fieldErrors,
}: AddPodcastTextInputsProperties) {
  return (
    <div className="flex gap-4">
      {['title', 'feedUrl'].map(key => {
        const typedKey = key as keyof typeof formState;

        return (
          <Input
            key={typedKey}
            isRequired
            size="sm"
            className="text-black"
            disabled={isPending}
            value={formState[typedKey] as string}
            errorMessage={fieldErrors?.[typedKey]?.[0]}
            label={text?.[typedKey]}
            onValueChange={setValue(typedKey)}
          />
        );
      })}
    </div>
  );
}
