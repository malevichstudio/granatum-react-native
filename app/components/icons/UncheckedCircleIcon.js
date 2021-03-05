import React, { memo } from 'react';
import Svg, { Rect } from 'react-native-svg';

const UncheckedCircleIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Rect x={2.5} y={2.5} width={19} height={19} rx={9.5} />
  </Svg>
);

export default memo(UncheckedCircleIcon);
