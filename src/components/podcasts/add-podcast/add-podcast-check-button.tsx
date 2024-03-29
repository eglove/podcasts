import { get } from '@ethang/toolbelt/object/get';
import { Checkbox } from '@nextui-org/react';

import { PrimaryButton } from '../../common/primary-button';
import type { AddPodcastLayoutProperties } from './add-podcast-layout';

type AddPodcastCheckButtonProperties = Pick<
  AddPodcastLayoutProperties,
  'formState' | 'isPending' | 'setValue' | 'text' | 'validate'
>;

export function AddPodcastCheckButton({
  setValue,
  formState,
  validate,
  text,
  isPending,
}: AddPodcastCheckButtonProperties) {
  return (
    <div className="flex justify-end gap-4">
      <Checkbox
        size="sm"
        className="text-white"
        disabled={isPending}
        isSelected={formState.isSerial}
        onValueChange={setValue('isSerial')}
      >
        {get(text, 'isSerial', 'Is Serial')}
      </Checkbox>
      <PrimaryButton
        size="sm"
        isLoading={isPending}
        type="submit"
        onPress={validate}
      >
        {get(text, 'addPodcast', 'Add Podcast')}
      </PrimaryButton>
    </div>
  );
}
