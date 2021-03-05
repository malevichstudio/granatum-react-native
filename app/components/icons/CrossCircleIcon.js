import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const CrossCircleIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm2.475 6.11a.5.5 0 0 1 .707 0l.707.708a.5.5 0 0 1 0 .707L13.415 12l2.475 2.475a.5.5 0 0 1 0 .707l-.708.707a.5.5 0 0 1-.707 0L12 13.414 9.526 15.89a.5.5 0 0 1-.708 0l-.707-.707a.5.5 0 0 1 0-.707L10.586 12 8.111 9.525a.5.5 0 0 1 0-.707l.707-.707a.5.5 0 0 1 .708 0L12 10.586l2.475-2.475z"
    />
  </Svg>
);

export default memo(CrossCircleIcon);
