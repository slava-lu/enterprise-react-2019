import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

i18n
  .use(Backend)
  .use(reactI18nextModule)
  .init({
    backend: {
      loadPath: 'translations/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true
    }
  });
