import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 7a4 4 0 11-8 0 4 4 0 018 0zm-.524 4.89a6 6 0 111.414-1.414l3.817 3.817-1.414 1.414-3.816-3.816z"
    />
  </Svg>
);

export default memo(SearchIcon);
