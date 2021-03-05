import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * @storyfied
 * @param props
 * @returns {*}
 * @constructor
 */
const GroupAltIcon = (props) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="#3294E6" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 5a3 3 0 116 0 3 3 0 01-6 0zm-2 9a4 4 0 014-4h2a4 4 0 014 4v.5a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5V14zm9-9c0 .639-.15 1.243-.416 1.779a3 3 0 100-3.557C8.85 3.756 9 4.361 9 5zm2 9.5a1.5 1.5 0 01-.085.5H15.5a.5.5 0 00.5-.5V14a4 4 0 00-4-4h-2c-.3 0-.594.033-.876.096A4.99 4.99 0 0111 14v.5z"
    />
  </Svg>
);

export default memo(GroupAltIcon);
