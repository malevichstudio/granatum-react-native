import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const FollowIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.974 14c-.254 2.25-2.196 4-4.513 4C4.02 18 2.001 16.021 2 13.58c0-1.022.353-2.012 1-2.802l3.567-4.36c1.488-1.817 4.435-.765 4.435 1.584V9h1.999v-.996c0-2.35 2.947-3.401 4.435-1.583L21 10.78c.646.79.999 1.778.999 2.798C22 16.02 19.982 18 17.54 18c-2.316 0-4.258-1.75-4.511-4h-2.055zM9 13.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm8.501 2.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
    />
  </Svg>
);

export default memo(FollowIcon);
