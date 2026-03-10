import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import nlTranslation from './locales/nl/translation.json';
import deTranslation from './locales/de/translation.json';

const detectorOptions = {
    order: ['path', 'localStorage', 'navigator'],
    lookupFromPathIndex: 0,
    lookupLocalStorage: 'siteLanguage',
    caches: ['localStorage'],
    checkWhitelist: true
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            nl: { translation: nlTranslation },
            de: { translation: deTranslation }
        },
        fallbackLng: 'en',
        supportedLngs: ['en', 'nl', 'de'],
        interpolation: {
            escapeValue: false
        },
        detection: detectorOptions
    });

// SEO logic for path detection
const path = window.location.pathname;
const langInPath = path.split('/')[1];
if (['nl', 'de'].includes(langInPath)) {
    if (i18n.language !== langInPath) {
        i18n.changeLanguage(langInPath);
    }
} else if (i18n.language !== 'en') {
    // If no prefix and not en, but we want default en for root
    i18n.changeLanguage('en');
}

export default i18n;
