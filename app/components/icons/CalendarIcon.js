import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const CalendarIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 1a.5.5 0 00-.5.5V3a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2V1.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5V3H5V1.5a.5.5 0 00-.5-.5h-1zM13 6H3v7h10V6z"
    />
    <Path d="M4 10h2v2H4v-2zM4 7h2v2H4V7zM7 10h2v2H7v-2zM7 7h2v2H7V7zM10 10h2v2h-2v-2zM10 7h2v2h-2V7z" />
  </Svg>
);

export default memo(CalendarIcon);
