// @flow

import variable from './../variables/platform';

export default (variables /*: * */ = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    '.note': {
      color: '#a7a7a7',
      fontSize: variables.noteFontSize,
    },
    '.button': {
      fontFamily: variables.oktaMedium,
      fontSize: 17,
      lineHeight: 24,
      letterSpacing: 0.1,
    },
    //Заголовок на страницах авторизации
    '.authTitle': {
      fontFamily: variables.oktaBold,
      letterSpacing: 0.1,
      fontSize: variables.titleAuthFontSize,
    },
    '.link': {
      fontFamily: variables.oktaMedium,
      color: variables.primary,
    },

    // Выравнивание
    '.alignCenter': {
      textAlign: 'center',
    },
    '.alignRight': {
      textAlign: 'right',
    },
    '.alignLeft': {
      textAlign: 'left',
    },

    // Цвета
    '.error': {
      color: variables.error,
    },
    '.gray': {
      color: variables.textGray,
    },
    '.lightGray': {
      color: variables.textLight,
    },
    '.darkGray': {
      color: variables.textD2,
    },
    '.dark': {
      color: variables.textDark,
    },
    '.light': {
      color: variables.white,
    },

    '.uppercase': {
      textTransform: 'uppercase',
    },

    // Лейбл типа "published/unpublished"
    '.statusLabel': {
      fontFamily: variables.oktaMedium,
      color: variables.white,
    },

    // Заголовки
    '.variantCaption': {
      fontSize: 12,
      fontFamily: variables.oktaRegular,
      lineHeight: 16,
    },
    '.variantCaption2': {
      fontSize: variables.captionText,
      fontFamily: variables.oktaRegular,
    },
    '.variantH5': {
      fontFamily: variables.oktaBold,
      fontSize: 28,
      lineHeight: 32,
    },
    '.variantH6': {
      fontFamily: variables.oktaBold,
      fontSize: 20,
      lineHeight: 24,
    },
    '.variantSubtitle1': {
      fontFamily: variables.oktaBold,
      fontSize: 18,
      lineHeight: 24,
    },
    '.variantSubtitle2': {
      fontFamily: variables.oktaMedium,
      fontSize: 15,
      lineHeight: 20,
    },
    '.variantBody2': {
      fontFamily: variables.oktaRegular,
      fontSize: 15,
      lineHeight: 20,
    },
    '.variantBody1': {
      fontFamily: variables.oktaRegular,
      fontSize: 17,
      lineHeight: 24,
    },
    '.variantBody': {
      fontFamily: variables.oktaRegular,
      fontSize: 14,
      lineHeight: 24,
    },

    // Шрифты
    // 400
    '.italic': {
      fontFamily: variables.oktaItalic,
    },
    // 400
    '.normal': {
      fontFamily: variables.oktaRegular,
    },
    // 600
    '.semiBold': {
      fontFamily: variables.oktaMedium,
    },
    // 900
    '.black': {
      fontFamily: variables.oktaBold,
    },
  };

  return textTheme;
};
