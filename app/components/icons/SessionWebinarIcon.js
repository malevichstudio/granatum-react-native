import React, { memo } from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';

const SessionWebinarIcon = (props) => (
  <Svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="currentColor"
    {...props}>
    <Rect width={48} height={48} rx={3} />
    <G opacity={0.6} fill="#fff">
      <Path d="M24 22.6a4.8 4.8 0 110-9.6 4.8 4.8 0 010 9.6zM31.83 27.804l-.053-.366A5.766 5.766 0 0027.2 22.6s-.831.393-1.77.66l-.93 1.24 1.5 3-2 1.5-2-1.5 1.5-3-.93-1.24c-.939-.267-1.77-.66-1.77-.66a5.766 5.766 0 00-4.577 4.838l-.052.366c-.09.631.4 1.196 1.037 1.196h13.584c.637 0 1.127-.565 1.037-1.196z" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 7a3 3 0 013-3h34a3 3 0 013 3v28a3 3 0 01-3 3H25v4h9a1 1 0 110 2H14a1 1 0 110-2h9v-4H7a3 3 0 01-3-3V7zm37 29H7a1 1 0 01-1-1V7a1 1 0 011-1h34a1 1 0 011 1v28a1 1 0 01-1 1z"
      />
    </G>
  </Svg>
);

export default memo(SessionWebinarIcon);
