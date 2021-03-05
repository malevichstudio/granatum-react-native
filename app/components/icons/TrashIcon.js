import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * @storyfied
 * @param props
 * @returns {*}
 * @constructor
 */

const TrashIcon = (props) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="inherit" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 2C5 0.89543 5.89543 0 7 0H9C10.1046 0 11 0.895431 11 2V3H15.5C15.7761 3 16 3.22386 16 3.5V4.5C16 4.77614 15.7761 5 15.5 5H14V14C14 15.1046 13.1046 16 12 16H4C2.89543 16 2 15.1046 2 14V5H0.5C0.223858 5 0 4.77614 0 4.5V3.5C0 3.22386 0.223858 3 0.5 3H5V2ZM7 3H9V2H7V3ZM4 5V14H12V5H4ZM10 8.5C10 8.77614 9.77614 9 9.5 9H6.5C6.22386 9 6 8.77614 6 8.5V7.5C6 7.22386 6.22386 7 6.5 7H9.5C9.77614 7 10 7.22386 10 7.5V8.5Z"
    />
  </Svg>
);

export default memo(TrashIcon);
