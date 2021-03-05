import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const MoveIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 13v8a1 1 0 102 0v-8h8a1 1 0 100-2h-8V3a1 1 0 10-2 0v8H3a1 1 0 100 2h8z"
      fill="currentColor"
    />
    <Path
      d="M15 6l-3-3-3 3m6 12l-3 3-3-3M18 15l3-3-3-3M6 15l-3-3 3-3"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default memo(MoveIcon);
