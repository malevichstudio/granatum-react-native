import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const CloseIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}>
    <Path d="M8 6.5l4.646-4.646a.5.5 0 0 1 .708 0l.792.792a.5.5 0 0 1 0 .708L9.5 8l4.646 4.646a.5.5 0 0 1 0 .707l-.792.793a.5.5 0 0 1-.708 0L8 9.5l-4.646 4.646a.5.5 0 0 1-.708 0l-.792-.793a.5.5 0 0 1 0-.707L6.5 8 1.854 3.354a.5.5 0 0 1 0-.708l.792-.792a.5.5 0 0 1 .708 0L8 6.5z" />
  </Svg>
);

export default memo(CloseIcon);
