import { getCookieValue } from '@ethang/toolbelt/http/cookie';
import { isNil } from '@ethang/toolbelt/is/nil';
import { init } from 'i18next';
import type { GetServerSidePropsContext } from 'next';

import { enI18n } from './i18n-languages/en';

export const i18next = async (language = 'en') => {
  return init({
    fallbackLng: 'en',
    lng: language,
    resources: {
      en: enI18n,
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
