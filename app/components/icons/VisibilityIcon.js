import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const VisibilityIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path d="M16 12a4 4 0 11-2.822-3.824 2 2 0 102.646 2.646c.114.373.176.768.176 1.178z" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.506 11.73a.914.914 0 010 .542C21.113 16.75 16.936 20 12 20c-4.937 0-9.114-3.252-10.506-7.73a.914.914 0 010-.542C2.888 7.25 7.065 4 12 4c4.936 0 9.113 3.252 10.506 7.73zM12 6a9.005 9.005 0 018.489 6 9.005 9.005 0 01-16.977 0A9.005 9.005 0 0112 6z"
    />
  </Svg>
);

export default memo(VisibilityIcon);
