import React from 'react';
import Svg, {
  Path,
  G,
  Defs,
  Rect,
  Stop,
  Circle,
  LinearGradient,
} from 'react-native-svg';

const PresentationWidgetPlaceholder = (props) => (
  <Svg width={224} height={224} fill="none" {...props}>
    <G filter="url(#prefix__filter0_d)">
      <Path
        d="M192.61 99.2c2.692 4.663 4.038 6.995 4.565 9.473a16.01 16.01 0 010 6.654c-.527 2.478-1.873 4.81-4.565 9.473l-29.22 50.61c-2.692 4.663-4.038 6.995-5.922 8.691a16.003 16.003 0 01-5.761 3.326c-2.41.783-5.103.783-10.487.783H82.78c-5.384 0-8.076 0-10.487-.783a16.006 16.006 0 01-5.762-3.326c-1.883-1.696-3.229-4.028-5.921-8.691L31.39 124.8c-2.692-4.663-4.038-6.995-4.565-9.473a16.003 16.003 0 010-6.654c.527-2.478 1.873-4.81 4.565-9.473l29.22-50.61c2.692-4.663 4.038-6.995 5.921-8.69a16 16 0 015.762-3.327c2.41-.783 5.103-.783 10.487-.783h58.44c5.384 0 8.077 0 10.487.783a15.997 15.997 0 015.761 3.326c1.884 1.696 3.23 4.028 5.922 8.69L192.61 99.2z"
        fill="#F7F8FA"
      />
    </G>
    <G opacity={0.27}>
      <Path
        d="M79 88l16-16h42a2 2 0 012 2v76a2 2 0 01-2 2H81a2 2 0 01-2-2V88z"
        fill="#5C6484"
      />
      <Path
        d="M79 88l16-16h42a2 2 0 012 2v76a2 2 0 01-2 2H81a2 2 0 01-2-2V88z"
        fill="url(#prefix__paint0_linear)"
        fillOpacity={0.5}
      />
    </G>
    <Path opacity={0.2} d="M79 88l16-16v14a2 2 0 01-2 2H79z" fill="#5C6484" />
    <Rect x={87} y={125} width={44} height={3} rx={0.5} fill="#5C6484" />
    <Rect x={87} y={117} width={44} height={3} rx={0.5} fill="#5C6484" />
    <Rect x={87} y={133} width={44} height={3} rx={0.5} fill="#5C6484" />
    <Rect x={87} y={141} width={33} height={3} rx={0.5} fill="#5C6484" />
    <Path
      opacity={0.3}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M87 88v21a1 1 0 001 1h42a1 1 0 001-1V83a1 1 0 00-1-1H95v4a2 2 0 01-2 2h-6z"
      fill="#fff"
    />
    <Path
      opacity={0.6}
      d="M116.293 96.707l-7.586 7.586c-.63.63-.184 1.707.707 1.707h15.172c.891 0 1.337-1.077.707-1.707l-7.586-7.586a1 1 0 00-1.414 0z"
      fill="#5C6484"
    />
    <Path
      d="M104.293 92.707l-11.586 11.586c-.63.63-.184 1.707.707 1.707h23.172c.891 0 1.337-1.077.707-1.707l-11.586-11.586a1 1 0 00-1.414 0z"
      fill="#5C6484"
    />
    <Circle cx={120.5} cy={88.5} r={2.5} fill="#5C6484" />
    <Path
      opacity={0.05}
      d="M109 72h28a2 2 0 012 2v76a2 2 0 01-2 2h-28V72z"
      fill="#5C6484"
    />
    <Rect
      x={102.5}
      y={121.5}
      width={46}
      height={21}
      rx={3.5}
      fill="#5C6484"
      stroke="#F7F8FA"
      strokeWidth={3}
    />
    <Path d="M132 127v10h2v-3.5h3v-2h-3V129h5v-2h-7z" fill="#F7F8FA" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M112 127v10h2v-3h2.5a3.5 3.5 0 100-7H112zm4.5 5H114v-3h2.5a1.5 1.5 0 010 3zM122 127v10h4a4 4 0 004-4v-2a4 4 0 00-4-4h-4zm2 8v-6h2a2 2 0 012 2v2a2 2 0 01-2 2h-2z"
      fill="#F7F8FA"
    />
    <Defs>
      <LinearGradient
        id="prefix__paint0_linear"
        x1={79}
        y1={72}
        x2={142.071}
        y2={149.501}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default PresentationWidgetPlaceholder;
