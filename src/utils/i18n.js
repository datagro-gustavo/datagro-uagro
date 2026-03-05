// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


export const SUPPORTED_LANGS = ['pt', 'en', 'es'];
export const DEFAULT_LANG = 'pt';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: 'translationEN' },
      pt: { translation: 'translationPT ' },
    },

    // Aceite apenas pt e en; mapeie pt-BR -> pt, en-US -> en
    supportedLngs: ['en', 'pt'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    cleanCode: true,

    // Se detectar "pt*", use pt; para qualquer outra língua (fr, es, de...), use EN
    fallbackLng: (detected) => (detected && detected.startsWith('pt') ? 'pt' : 'en'),

    // Detector: onde procurar e onde salvar a escolha do usuário
    detection: {
      order: ['querystring', 'localStorage', 'cookie', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    returnEmptyString: false,
  });

export default i18n;
