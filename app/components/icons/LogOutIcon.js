import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const LogOutIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h4.5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H6a1 1 0 01-1-1V6a1 1 0 011-1h4.5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H6zm11.586 8l-1.94-1.94a.5.5 0 010-.706l.708-.708a.5.5 0 01.707 0l3.646 3.647.354.353a.5.5 0 010 .708l-.354.353-3.646 3.647a.5.5 0 01-.707 0l-.708-.708a.5.5 0 010-.707L17.586 13H9.5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h8.086z"
    />
  </Svg>
);

export default memo(LogOutIcon);
