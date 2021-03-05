import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const EnterMessageIcon = (props) => (
  <Svg width={24} height={24} fill="#fff" {...props}>
    <Path d="M21.972 11.543L5.826 4.367a.5.5 0 00-.698.528l.816 5.714a.5.5 0 00.45.427L17 12l-10.606.964a.5.5 0 00-.45.427l-.816 5.714a.5.5 0 00.698.528l16.146-7.176a.5.5 0 000-.914z" />
  </Svg>
);

export default memo(EnterMessageIcon);
