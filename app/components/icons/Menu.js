import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * @storyfied
 * @param props
 * @returns {*}
 * @constructor
 */
const Menu = (props) => (
  <Svg width={24} height={24} fill="#383A48" {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 5.5C3 5.22386 3.22386 5 3.5 5H20.5C20.7761 5 21 5.22386 21 5.5V6.5C21 6.77614 20.7761 7 20.5 7H3.5C3.22386 7 3 6.77614 3 6.5V5.5ZM3 11.5C3 11.2239 3.22386 11 3.5 11H20.5C20.7761 11 21 11.2239 21 11.5V12.5C21 12.7761 20.7761 13 20.5 13H3.5C3.22386 13 3 12.7761 3 12.5V11.5ZM12 17.5C12 17.2239 11.7761 17 11.5 17H3.5C3.22386 17 3 17.2239 3 17.5V18.5C3 18.7761 3.22386 19 3.5 19H11.5C11.7761 19 12 18.7761 12 18.5V17.5Z"
    />
  </Svg>
);

export default memo(Menu);
