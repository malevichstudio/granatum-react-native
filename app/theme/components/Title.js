// @flow

import { Platform } from 'react-native';

import variable from './../variables/platform';

export default (variables /*: * */ = variable) => {
  const titleTheme = {
    fontSize: variables.titleFontSize,
    fontFamily: variables.titleFontfamily,
    color: variables.titleFontColor,
    fontWeight: Platform.OS === 'ios' ? '700' : undefined,
    textAlign: 'center',
    paddingLeft: Platform.OS === 'ios' ? 4 : 0,
    marginLeft: Platform.OS === 'ios' ? undefined : -3,
    paddingTop: 1,

    // для названия страницы в хедере
    '.screenTitle': {
      fontFamily: variables.oktaBold,
      fontSize: 17,
      color: variables.textDark,
      alignSelf: 'center',
    },
  };

  return titleTheme;
};
