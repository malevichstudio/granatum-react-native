import React, { memo } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const UserAccountIcon = (props) => (
  <Svg width={24} height={24} fill="inherit" {...props}>
    <Path d="M7 7a5 5 0 1110 0A5 5 0 017 7zM8.502 13.344c2.297-.574 4.7-.574 6.996 0l.838.21A6.157 6.157 0 0121 19.525 2.473 2.473 0 0118.526 22H5.473A2.473 2.473 0 013 19.526a6.157 6.157 0 014.664-5.973l.838-.21z" />
  </Svg>
);

export default memo(UserAccountIcon);
