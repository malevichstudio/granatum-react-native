import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const CommentsIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path d="M9 18v-.875c.483 0 .875.392.875.875H9zm4 0l-.619-.619a.875.875 0 01.619-.256V18zm-4 4l.619.619A.875.875 0 018.125 22H9zM19 4.875H5v-1.75h14v1.75zM2.875 7v8h-1.75V7h1.75zm18.25 8V7h1.75v8h-1.75zM5 17.125h4v1.75H5v-1.75zm8 0h6v1.75h-6v-1.75zM9.875 18v4h-1.75v-4h1.75zm-1.494 3.381l4-4 1.238 1.238-4 4L8.38 21.38zM22.875 15A3.875 3.875 0 0119 18.875v-1.75A2.125 2.125 0 0021.125 15h1.75zm-20 0c0 1.174.951 2.125 2.125 2.125v1.75A3.875 3.875 0 011.125 15h1.75zM5 4.875A2.125 2.125 0 002.875 7h-1.75A3.875 3.875 0 015 3.125v1.75zm14-1.75A3.875 3.875 0 0122.875 7h-1.75A2.125 2.125 0 0019 4.875v-1.75z" />
  </Svg>
);

export default memo(CommentsIcon);
