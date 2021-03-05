import React, { memo } from 'react';
import Svg, { Path, G, Defs, ClipPath } from 'react-native-svg';

const ChevronRightIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}>
    <G clipPath="url(#prefix__clip0)">
      <Path d="M12.56 8.354a.5.5 0 000-.707L5.855.939a.5.5 0 00-.707 0l-.708.708a.5.5 0 000 .707L10.086 8l-5.647 5.646a.5.5 0 000 .708l.708.707a.5.5 0 00.707 0l6.707-6.707z" />
    </G>
    <Defs>
      <ClipPath id="prefix__clip0">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default memo(ChevronRightIcon);
