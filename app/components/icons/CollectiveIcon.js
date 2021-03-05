import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const CollectiveIcon = (props) => (
  <Svg
    fill="currentColor"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 3.5a2.5 2.5 0 014.442-1.575 3.992 3.992 0 00-1.334 4A2.5 2.5 0 011 3.5zM12 5c0 .319-.037.629-.108.926a2.5 2.5 0 10-1.334-4A3.992 3.992 0 0112 4.999zM4 8c.918 0 1.74.413 2.29 1.063A4.001 4.001 0 003 13H.5a.5.5 0 01-.5-.5V11a3 3 0 013-3h1zm11.5 5H13a4.001 4.001 0 00-3.29-3.937A2.993 2.993 0 0112 8h1a3 3 0 013 3v1.5a.5.5 0 01-.5.5zM5 5a3 3 0 116 0 3 3 0 01-6 0zm-1 8a3 3 0 013-3h2a3 3 0 013 3v1.5a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5V13z"
    />
  </Svg>
);

export default memo(CollectiveIcon);
