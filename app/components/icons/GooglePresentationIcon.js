import React from 'react';
import Svg, {
  Path,
  RadialGradient,
  Defs,
  Stop,
  LinearGradient,
} from 'react-native-svg';

const GooglePresentationIcon = (props) => (
  <Svg width={52} height={72} viewBox="0 0 52 72" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 0h29l18 18v49a5 5 0 01-5 5H5a5 5 0 01-5-5V5a5 5 0 015-5z"
      fill="#F4B400"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 66a5 5 0 005 5h42a5 5 0 005-5v1a5 5 0 01-5 5H5a5 5 0 01-5-5v-1z"
      fill="#BF360C"
      fillOpacity={0.2}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 0h29v1H5a5 5 0 00-5 5V5a5 5 0 015-5z"
      fill="#fff"
      fillOpacity={0.2}
    />
    <Path d="M35 16l17 17V18" fill="url(#prefix__paint0_linear)" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M34 0l18 18H39a5 5 0 01-5-5V0z"
      fill="#FADA80"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 32h22a3 3 0 013 3v22a3 3 0 01-3 3H15a3 3 0 01-3-3V35a3 3 0 013-3zm1 8v12h20V40H16z"
      fill="#F1F1F1"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 0h29l18 18v49a5 5 0 01-5 5H5a5 5 0 01-5-5V5a5 5 0 015-5z"
      fill="url(#prefix__paint1_radial)"
      fillOpacity={0.1}
    />
    <Defs>
      <RadialGradient
        id="prefix__paint1_radial"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(83.849 0 0 83.8487 1.647 1.43)">
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </RadialGradient>
      <LinearGradient
        id="prefix__paint0_linear"
        x1={43.501}
        y1={17.46}
        x2={43.501}
        y2={33.002}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#BF360C" stopOpacity={0.2} />
        <Stop offset={1} stopColor="#BF360C" stopOpacity={0.02} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default GooglePresentationIcon;
