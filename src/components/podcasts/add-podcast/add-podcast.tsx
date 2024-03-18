import { isNil } from '@ethang/toolbelt/is/nil';
import { Button, Checkbox, Input } from '@nextui-org/react';

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
    handleSetValue,
    handleSubmit,
    isPending,
    validate,
    fieldErrors,
    formState,
  } = useAddPodcast();

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
              color={isNil(fieldErrors?.[typedKey]) ? 'default' : 'danger'}
              value={formState[typedKey] as string}
              errorMessage={fieldErrors?.[typedKey]?.[0]}
              label={text[typedKey]}
              onValueChange={handleSetValue(typedKey)}
            />
          );
        })}
        <Button
          isLoading={isPending}
          color="primary"
          type="submit"
          onPress={validate}
        >
          {text.submit}
        </Button>
      </form>
    </>
  );
}
