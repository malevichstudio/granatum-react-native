import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const GranatumIcon = (props) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="#ccc" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 2.8a.2.2 0 00.2.2h5.6c.01 0 .02 0 .03-.002A.2.2 0 0011 2.8V0L9.5 1.5 8 0 6.5 1.5 5 0v2.8zm9.87 7.1a.2.2 0 010 .2l-3.348 5.8a.2.2 0 01-.173.1H4.65a.2.2 0 01-.173-.1L1.13 10.1a.2.2 0 010-.2l3.348-5.8a.2.2 0 01.173-.1h6.698a.2.2 0 01.173.1l3.349 5.8zM10.31 6l2.309 4-2.31 4H5.692l-2.31-4 2.31-4h4.619z"
    />
  </Svg>
);

export default memo(GranatumIcon);
