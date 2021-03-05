import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowLeftDirection = (props) => (
  <Svg width={16} height={16} fill="currentColor" {...props}>
    <Path
      d="M8 1L1 8M1 8L8 15M1 8H17"
      stroke="#2E303D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default memo(ArrowLeftDirection);
