import React, { memo } from 'react';
import Svg, { Path, Rect, G, Defs, ClipPath } from 'react-native-svg';

const ProjectLogoIcon = (props) => (
  <Svg width={64} height={64} {...props}>
    <G clipPath="url(#prefix__clip0)" filter="url(#prefix__filter0_dd)">
      <Path
        d="M4 11a4 4 0 014-4h15.172a2 2 0 011.414.586L28 11h28a4 4 0 014 4v36a4 4 0 01-4 4H8a4 4 0 01-4-4V11z"
        fill="#3A87E0"
      />
      <G filter="url(#prefix__filter1_d)">
        <Path
          d="M4 24.5A3.5 3.5 0 017.5 21h15.672a2 2 0 001.414-.586l2.828-2.828A2 2 0 0128.828 17H56a4 4 0 014 4v3a4 4 0 01-4 4H7.5A3.5 3.5 0 014 24.5z"
          fill="#3A87E0"
        />
      </G>
      <Path
        d="M4 25a4 4 0 014-4h15.172a2 2 0 001.414-.586l2.828-2.828A2 2 0 0128.828 17H56a4 4 0 014 4v30a4 4 0 01-4 4H8a4 4 0 01-4-4V25z"
        fill="#579BE9"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44.78 31.035l-12.598-4.93a.5.5 0 00-.364 0l-12.598 4.93a.5.5 0 000 .93l12.598 4.93a.5.5 0 00.364 0l12.598-4.93a.5.5 0 000-.93zM20 38.133v-4.788l1 .391v4.398l.145.08c.336.183.855.467.855.786 0 .552-.948 4.5-1.5 4.5S19 39.552 19 39c0-.319.52-.603.855-.786.054-.03.104-.056.145-.08zm11.453-.306L24.1 34.949V40c0 .719.344 1.328.81 1.8.462.468 1.086.849 1.786 1.149 1.403.601 3.28.951 5.304.951 2.025 0 3.901-.35 5.304-.951.7-.3 1.325-.68 1.787-1.149.466-.472.81-1.081.81-1.8v-5.05l-7.354 2.877a1.5 1.5 0 01-1.093 0z"
        fill="#fff"
        opacity={0.5}
      />
    </G>
    <Defs>
      <ClipPath id="prefix__clip0">
        <Path fill="#fff" transform="translate(4 7)" d="M0 0h56v48H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default memo(ProjectLogoIcon);
