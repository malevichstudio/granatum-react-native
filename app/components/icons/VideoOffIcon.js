import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const VideoOffIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path d="M3.16 3.868a.5.5 0 000 .707L5.585 7H5a2 2 0 00-2 2v6a2 2 0 002 2h9a1.99 1.99 0 001.191-.393l4.233 4.232a.5.5 0 00.707 0l.707-.707a.5.5 0 000-.708L4.574 3.161a.5.5 0 00-.707 0l-.707.707zM16.121 11.879l4.025-4.025a.5.5 0 01.854.353v7.344a.5.5 0 01-.854.354l-4.025-4.026zM16 9v2.758l-3.904-3.904A.5.5 0 0112.449 7H14a2 2 0 012 2z" />
  </Svg>
);

export default memo(VideoOffIcon);
