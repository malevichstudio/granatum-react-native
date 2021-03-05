import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowDown = (props) => (
  <Svg width={14} height={8} viewBox="0 0 14 8" fill="currentColor" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.00005 5.58586L12.0858 0.500075C12.4764 0.109551 13.1095 0.109551 13.5 0.500076C13.8906 0.8906 13.8906 1.52377 13.5 1.91429L7.70715 7.70718C7.31663 8.09771 6.68346 8.09771 6.29294 7.70718L0.500047 1.91429C0.109523 1.52376 0.109523 0.890599 0.500047 0.500075C0.890571 0.109551 1.52374 0.109551 1.91426 0.500075L7.00005 5.58586Z"
      fill="#2E303D"
    />
  </Svg>
);

export default memo(ArrowDown);
