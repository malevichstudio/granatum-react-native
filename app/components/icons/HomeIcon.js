import React, { memo } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const HomeIcon = (props) => (
  <Svg width={24} height={24} fill="inherit" {...props}>
    <Path d="M22 8.699a3 3 0 00-1.456-2.573l-7-4.2a3 3 0 00-3.088 0l-7 4.2A3 3 0 002 8.7V19a3 3 0 003 3h14a3 3 0 003-3V8.699z" />
    <Rect x={9} y={10} width={6} height={6} rx={2} fill="#fff" />
  </Svg>
);

export default memo(HomeIcon);
