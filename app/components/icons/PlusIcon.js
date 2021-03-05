import React, { memo } from 'react';
import Svg, { Path, Defs, ClipPath, G } from 'react-native-svg';

const PlusIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}>
    <G clipPath="url(#prefix__clip0)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 13.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V9H14a.5.5 0 00.5-.5v-1A.5.5 0 0014 7H9.5V2.5A.5.5 0 009 2H8a.5.5 0 00-.5.5V7H3a.5.5 0 00-.5.5v1A.5.5 0 003 9h4.5v4.5z"
      />
    </G>
    <Defs>
      <ClipPath id="prefix__clip0">
        <Path transform="translate(.5)" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default memo(PlusIcon);
