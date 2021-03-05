import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const ClockIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 16A8 8 0 108 0a8 8 0 000 16zm0-2A6 6 0 108 2a6 6 0 000 12zM7 4.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5V7h1.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-4z"
    />
  </Svg>
);

export default memo(ClockIcon);
