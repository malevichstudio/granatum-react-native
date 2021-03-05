import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const VideoIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path d="M16 9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h9a2 2 0 002-2v-3l4.146 4.146a.5.5 0 00.854-.353V8.207a.5.5 0 00-.854-.353L16 12V9z" />
  </Svg>
);

export default memo(VideoIcon);
