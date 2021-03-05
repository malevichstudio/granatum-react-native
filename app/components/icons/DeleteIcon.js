import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const DeleteIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 4a2 2 0 012-2h4a2 2 0 012 2v2h4.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H19v12a2 2 0 01-2 2H7a2 2 0 01-2-2V8H3.5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H8V4zm2 2h4V4h-4v2zM7 8v12h10V8H7zm4 9.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v7z"
    />
    <Path d="M13 17.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-7a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v7z" />
  </Svg>
);

export default memo(DeleteIcon);
