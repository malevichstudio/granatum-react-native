import React, { memo } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const FolderIcon = (props) => (
  <Svg width={24} height={24} fill="inherit" {...props}>
    <Path d="M22 8a3 3 0 00-3-3h-6.172a2 2 0 01-1.414-.586l-.828-.828A2 2 0 009.172 3H5a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3V8z" />
    <Rect x={7} y={9} width={10} height={2} rx={1} fill="#fff" />
  </Svg>
);

export default memo(FolderIcon);
