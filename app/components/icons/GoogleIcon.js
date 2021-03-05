import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * @storyfied
 * @param props
 * @returns {*}
 * @constructor
 */
const GoogleIcon = (props) => (
  <Svg width="56" height="56" viewBox="0 0 56 56" fill="none" {...props}>
    <Path
      x={0.5}
      y={0.5}
      width={55}
      height={55}
      rx={27.5}
      fill="#fff"
      stroke="#DFE1E7"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M36.64 28.205c0-.638-.057-1.252-.164-1.841H28v3.481h4.844a4.14 4.14 0 01-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      fill="#4285F4"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28 37c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.805.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711h-3.007v2.332A8.997 8.997 0 0028 37z"
      fill="#34A853"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.964 29.71a5.41 5.41 0 01-.282-1.71c0-.593.102-1.17.282-1.71v-2.332h-3.007A8.996 8.996 0 0019 28c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      fill="#FBBC05"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28 22.58c1.321 0 2.508.454 3.44 1.346l2.582-2.582C32.462 19.892 30.426 19 28 19a8.997 8.997 0 00-8.043 4.958l3.007 2.332c.708-2.127 2.692-3.71 5.036-3.71z"
      fill="#EA4335"
    />
  </Svg>
);

export default memo(GoogleIcon);
