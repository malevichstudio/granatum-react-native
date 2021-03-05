import React, { memo } from 'react';
import Svg, { Rect } from 'react-native-svg';

/**
 * @storyfied
 * @param props
 * @returns {*}
 * @constructor
 */
const ListIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}>
    <Rect x={5} y={2} width={11} height={2} rx={0.5} />
    <Rect x={5} y={7} width={11} height={2} rx={0.5} />
    <Rect x={5} y={12} width={11} height={2} rx={0.5} />
    <Rect y={1.5} width={3} height={3} rx={0.5} />
    <Rect y={6.5} width={3} height={3} rx={0.5} />
    <Rect y={11.5} width={3} height={3} rx={0.5} />
  </Svg>
);

export default memo(ListIcon);
