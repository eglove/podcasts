import { init } from 'i18next';

export const i18next = init({
  fallbackLng: 'en',
  resources: {
    en: { translation: { hello: 'Hello!' } },
    es: { translation: { hello: 'Hola!' } },
  },
});
