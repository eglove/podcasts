import { getCookieValue } from '@ethang/toolbelt/http/cookie';
import { isNil } from '@ethang/toolbelt/is/nil';
import { init } from 'i18next';
import type { GetServerSidePropsContext } from 'next';

export const i18next = async (language = 'en') => {
  return init({
    fallbackLng: 'en',
    lng: language,
    resources: {
      en: {
        translation: {
          addPodcast: 'Add Podcast',
          feedUrl: 'Feed URL',
          hello: 'Hello!',
          isSerial: 'Is Serial',
          submit: 'Submit',
          title: 'Title',
        },
      },
      es: { translation: { hello: 'Hola!' } },
    },
  });
};

export async function getT(request: GetServerSidePropsContext['req']) {
  let lang = 'en';
  if (!isNil(request.headers.cookie)) {
    const result = getCookieValue('lang', request.headers.cookie);

    if (result.isSuccess) {
      lang = result.data;
    }
  }

  return i18next(lang);
}
