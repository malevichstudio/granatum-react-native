import React, { memo } from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect, Circle } from 'react-native-svg';

const UserIcon = (props) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Circle cx={8} cy={5} r={3} stroke="currentColor" strokeWidth={1.8} />
    <Path
      d="M13 14c0-1.657-2.239-3-5-3s-5 1.343-5 3"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default memo(UserIcon);
