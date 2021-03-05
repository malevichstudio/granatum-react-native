import React, { memo } from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const PictureIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 5a1 1 0 011-1h18a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V5zm2 1v7.586l3.01-3.01a1.4 1.4 0 011.98 0L16.414 18H20V6H4zm0 12v-1.586l4-4L13.586 18H4zm14-8a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </Svg>
);

export default memo(PictureIcon);
