import React, { memo } from 'react';

import Svg, { Path } from 'react-native-svg';

const ArrowDownIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.717 5.651a.4.4 0 01.566 0L8 9.37l3.717-3.718a.4.4 0 01.566 0l.566.566a.4.4 0 010 .566l-4.566 4.565a.4.4 0 01-.566 0L3.151 6.783a.4.4 0 010-.566l.566-.566z"
    />
  </Svg>
);

export default memo(ArrowDownIcon);
