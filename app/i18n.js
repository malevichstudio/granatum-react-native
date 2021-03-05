/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
// const { getBrowserLang } = require('./utils/browsers/getBrowserLang');

const enTranslationMessages = require('./translations/en.json');
const ruTranslationMessages = require('./translations/ru.json');

// Это самое первое обращение к localStorage
// const getLang = () => {
//   if (window) {
//     // eslint-disable-next-line global-require
//     const { history } = require('./utils/history');
//
//     try {
//       localStorage.getItem(`granatum.lang`);
//     } catch (e) {
//       history.push('/cookies-blocked');
//     }
//   }
// };

// we need this function since we have to provide access to both es5-ony and es6
// environments
function getDefaultLocale() {
  if (typeof navigator !== 'object') {
    return 'ru';
  }

  const { Platform, NativeModules } = require('react-native');
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  return deviceLanguage ? deviceLanguage.substring(0, 2) : 'ru';
}

const DEFAULT_LOCALE = getDefaultLocale() === 'ru' ? 'ru' : 'en';

// prettier-ignore
const appLocales = [
  'en',
  'ru',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  ru: formatTranslationMessages('ru', ruTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
// exports.getLang = getLang;
