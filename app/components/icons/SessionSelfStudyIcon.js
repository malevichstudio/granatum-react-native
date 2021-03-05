import React, { memo } from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';

const SessionSelfStudyIcon = (props) => (
  <Svg width={48} height={48} viewBox="0 0 48 48" fill="none" {...props}>
    <Rect width={48} height={48} rx={3} />
    <G opacity={0.6} fill="#fff">
      <Path d="M9.2 17.8a4.8 4.8 0 109.6 0 4.8 4.8 0 00-9.6 0z" />
      <Path d="M21.777 27.438l.052.366c.09.631-.4 1.196-1.037 1.196H7.208a1.048 1.048 0 01-1.037-1.196l.052-.366A5.766 5.766 0 0110.8 22.6s1.902.9 3.2.9c1.298 0 3.2-.9 3.2-.9a5.766 5.766 0 014.577 4.838z" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 23a1 1 0 00-.94.658L25.3 34H16a1 1 0 100 2h23a1 1 0 00.94-.658l4-11A1 1 0 0043 23H30zm8.3 11H27.428l3.272-9h10.872L38.3 34z"
      />
    </G>
  </Svg>
);

export default memo(SessionSelfStudyIcon);
