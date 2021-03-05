// @flow

import variable from './../variables/platform';

export default (variables /*: * */ = variable) => {
  const cardTheme = {
    '.transparent': {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null,
      elevation: null,
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    '.noShadow': {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      elevation: null,
    },
    // тень в карточках проектов и курсов
    '.shadow1': {
      shadowColor: variables.primary,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.08,
      shadowRadius: 1.0,
      elevation: 1,
    },

    marginVertical: 8,
    marginHorizontal: 2,
    borderWidth: variables.borderWidth,
    borderRadius: variables.cardBorderRadius,
    borderColor: variables.cardBorderColor,
    flexWrap: 'nowrap',
    backgroundColor: variables.cardDefaultBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
  };

  return cardTheme;
};
