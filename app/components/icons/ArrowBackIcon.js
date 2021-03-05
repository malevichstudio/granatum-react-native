import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowBackIcon = (props) => (
  <Svg width={16} height={16} fill="currentColor" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.29289 11.2929L10.4393 4.14645C10.6346 3.95118 10.9512 3.95118 11.1464 4.14645L11.8536 4.85355C12.0488 5.04882 12.0488 5.3654 11.8536 5.56066L5.76777 11.6464C5.5725 11.8417 5.5725 12.1583 5.76777 12.3536L11.8536 18.4393C12.0488 18.6346 12.0488 18.9512 11.8536 19.1464L11.1464 19.8536C10.9512 20.0488 10.6346 20.0488 10.4393 19.8536L3.29289 12.7071L2.93934 12.3536C2.74408 12.1583 2.74408 11.8417 2.93934 11.6464L3.29289 11.2929Z"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 12.5C21 12.7761 20.7761 13 20.5 13H5C4.72386 13 4.5 12.7761 4.5 12.5V11.5C4.5 11.2239 4.72386 11 5 11H20.5C20.7761 11 21 11.2239 21 11.5V12.5Z"
    />
  </Svg>
);

export default memo(ArrowBackIcon);
