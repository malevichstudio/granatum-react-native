import { Platform } from 'react-native';

export const getStyle = (
  styles,
  availableColors,
  fontColors,
  sessionColors,
) => {
  let style = {
    transform: [{ translateY: 3 }],
  };

  styles?.forEach((label) => {
    switch (label) {
      case 'BOLD':
        return (style.fontWeight = '700');
      case 'ITALIC':
        return (style.fontStyle = 'italic');
      case 'UNDERLINE':
        return (style.textDecorationLine = 'underline');
      case 'h2': {
        let customFontSize = null;
        styles.forEach((el) => {
          if (el?.includes('FONT_SIZE_')) {
            customFontSize = el;
          }
        });
        return (style = {
          ...style,
          fontSize: customFontSize ? parseFontSize(customFontSize) : 36,
          fontWeight: '700',
        });
      }
      case 'VERTICAL_ALIGN_BOTTOM':
        return (style.transform = [{ translateY: 8 }]);
      case 'VERTICAL_ALIGN_TOP':
        style.transform = [{ translateY: 0 }];
    }

    if (label === 'LINK') {
      style = { ...style, color: '#3A87E0' };
      if (Platform.OS === 'ios') {
        style.bottom = -3;
      }
      return;
    }
    if (label?.includes('FONT_SIZE_')) {
      return (style.fontSize = parseFontSize(label));
    }
    if (label?.includes('FONT_COLOR_')) {
      return (style.color = parseColor(
        label,
        availableColors,
        fontColors,
        sessionColors,
      ));
    }
  });

  return style;
};

export const parseColor = (
  label,
  availableColors,
  fontColors,
  sessionColors,
) => {
  const index = label.lastIndexOf('_');
  const name = label.substring(index + 1).toLowerCase();
  const transformedName =
    'color' + name.charAt(0).toUpperCase() + name.slice(1);
  if (availableColors[transformedName] === 'inherit') {
    return sessionColors[fontColors[0]];
  }
  return availableColors[transformedName];
};

export const getAvailableColors = (fontColors, sessionColors) => {
  return {
    colorOne: fontColorOne(sessionColors, fontColors),
    colorTwo: fontColorTwo(sessionColors, fontColors),
    colorThree: fontColorThree(sessionColors, fontColors),
    colorFour: fontColorFour(sessionColors, fontColors),
    colorFive: fontColorFive(sessionColors, fontColors),
  };
};

const fontColorOne = (sessionColors, fontColors) => {
  return fontColors.length === 6
    ? sessionColors[fontColors[1]]
    : sessionColors.colorOne;
};

export const fontColorTwo = (sessionColors, fontColors) => {
  return fontColors.length === 6
    ? sessionColors[fontColors[2]]
    : sessionColors.colorTwo;
};

export const fontColorThree = (sessionColors, fontColors) => {
  return fontColors.length === 6
    ? sessionColors[fontColors[3]]
    : sessionColors.colorThree;
};

export const fontColorFour = (sessionColors, fontColors) => {
  return fontColors.length === 6 ? 'inherit' : sessionColors.colorFour;
};

export const fontColorFive = (sessionColors, fontColors) => {
  return fontColors.length === 6 ? 'inherit' : sessionColors.colorFive;
};

export const parseFontSize = (label) => {
  const index = label.lastIndexOf('_');
  return Number(label.substring(index + 1));
};
