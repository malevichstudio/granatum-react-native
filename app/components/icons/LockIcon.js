import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const LockIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 7A5 5 0 007 7v3H6a3 3 0 00-3 3v6a3 3 0 003 3h12a3 3 0 003-3v-6a3 3 0 00-3-3h-1V7zm-8 3V7a3 3 0 116 0v3H9zm9 2a1 1 0 011 1v6a1 1 0 01-1 1H6a1 1 0 01-1-1v-6a1 1 0 011-1h12zm-5 4.732A2 2 0 0012 13a2 2 0 00-1 3.732V18a1 1 0 102 0v-1.268z"
    />
  </Svg>
);

export default memo(LockIcon);
