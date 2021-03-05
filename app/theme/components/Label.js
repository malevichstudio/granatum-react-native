// @flow

import variable from './../variables/platform';

export default (variables /*: * */ = variable) => {
  const labelTheme = {
    '.focused': {
      color: variables.primary,
    },
    '.error': {
      color: variables.error,
    },
    fontSize: 17,
    fontFamily: variables.oktaRegular,
    color: variables.textGray,
  };

  return labelTheme;
};
