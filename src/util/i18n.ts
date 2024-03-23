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
          feedUrl: 'RSS or YouTube URL',
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

export async function getT(
  request: GetServerSidePropsContext['req'] | Request,
) {
  const cookies =
    request instanceof Request
      ? request.headers.get('Cookie')
      : request.headers.cookie;

  if (!isNil(cookies)) {
    const result = getCookieValue('lang', cookies);

    if (result.isSuccess) {
      return i18next(result.data);
    }
  }

  return i18next('en');
}
