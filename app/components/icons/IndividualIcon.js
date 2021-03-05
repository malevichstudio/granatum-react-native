import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const IndividualIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 2a3 3 0 100 6 3 3 0 000-6zm-1 8a4 4 0 00-4 4v.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V14a4 4 0 00-4-4H7z"
    />
  </Svg>
);

export default memo(IndividualIcon);
