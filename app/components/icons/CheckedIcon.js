import React, { memo } from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const CheckedIcon = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}>
    <Rect width="20" height="20" rx="3" />
    <Path
      fill="#fff"
      d="M9.43915 13.5963L15.096 7.93942C15.4865 7.54889 15.4865 6.91573 15.096 6.5252C14.7055 6.13468 14.0723 6.13468 13.6818 6.5252L8.73204 11.475L7.31783 10.0607C6.92731 9.67021 6.29414 9.67021 5.90362 10.0607C5.51309 10.4513 5.51309 11.0844 5.90362 11.475L8.02494 13.5963C8.41546 13.9868 9.04863 13.9868 9.43915 13.5963Z"
    />
  </Svg>
);

export default memo(CheckedIcon);
