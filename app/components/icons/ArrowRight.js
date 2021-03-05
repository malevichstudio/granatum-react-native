import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * @storyfied
 * @param props
 * @returns {*}
 * @constructor
 */
const ArrowRight = (props) => (
  <Svg width={8} height={16} fill="#1A1A1A" {...props}>
    <Path d="M8.56074 8.35363C8.756 8.15837 8.756 7.84178 8.56074 7.64652L1.85363 0.939415C1.65837 0.744153 1.34178 0.744153 1.14652 0.939415L0.439415 1.64652C0.244153 1.84178 0.244153 2.15837 0.439415 2.35363L6.08586 8.00008L0.439415 13.6465C0.244153 13.8418 0.244153 14.1584 0.439415 14.3536L1.14652 15.0607C1.34178 15.256 1.65837 15.256 1.85363 15.0607L8.56074 8.35363Z" />
  </Svg>
);

export default memo(ArrowRight);
