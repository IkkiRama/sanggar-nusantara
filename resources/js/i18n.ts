// resources/js/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'id',
    resources: {
      id: {
        translation: {
          welcome: 'Selamat Datang',
          language: 'Bahasa',
        },
      },
      en: {
        translation: {
          welcome: 'Welcome',
          language: 'Language',
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
