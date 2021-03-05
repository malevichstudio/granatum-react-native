import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronLeftIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}>
    <Path d="M3.44 7.647a.5.5 0 000 .707l6.707 6.707a.5.5 0 00.707 0l.707-.707a.5.5 0 000-.707L5.914 8l5.647-5.646a.5.5 0 000-.707l-.707-.708a.5.5 0 00-.707 0L3.439 7.647z" />
  </Svg>
);

export default memo(ChevronLeftIcon);
