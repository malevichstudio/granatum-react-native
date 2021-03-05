import React, { memo } from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const CheckCircleIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm4.697-.354l.707-.707a.5.5 0 01.707 0l2.475 2.475 5.303-5.303a.5.5 0 01.707 0l.707.707a.5.5 0 010 .707l-5.657 5.657-.707.707a.5.5 0 01-.707 0l-.707-.707-2.828-2.828a.5.5 0 010-.708z"
      fill="#56C969"
    />
  </Svg>
);

export default memo(CheckCircleIcon);
