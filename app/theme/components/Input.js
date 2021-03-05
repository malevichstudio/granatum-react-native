// @flow

import variable from './../variables/platform';

export default (variables /*: * */ = variable) => {
  const inputTheme = {
    '.multiline': {
      height: null,
    },
    '.contained': {
      backgroundColor: null,
    },
    '.error': {
      backgroundColor: variables.error,
    },
    height: variables.inputHeightBase,
    color: variables.inputColor,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    fontSize: variables.inputFontSize,
    fontFamily: variables.oktaRegular,
  };

  return inputTheme;
};
