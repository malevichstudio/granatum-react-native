import React, { memo } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const SessionKnowledgeCheckIcon = (props) => (
  <Svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="currentColor"
    {...props}>
    <Rect width={48} height={48} rx={3} />
    <Path
      opacity={0.6}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31 8a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 117 8.777V33a1 1 0 01-1.005 1 .423.423 0 00-.127.077c-.109.092-.249.263-.388.542-.279.557-.48 1.398-.48 2.381 0 .983.201 1.824.48 2.381.14.279.28.45.387.541a.423.423 0 00.128.077l.004.001H28a1 1 0 110 2H13a5 5 0 01-5-5V20a5 5 0 015-5h9zm.223 2H13a3 3 0 00-3 3v13c.836-.628 1.874-1 3-1h14v-8.936A9.015 9.015 0 0122.223 17zm3.34 17H13a3 3 0 100 6h12.564a7.143 7.143 0 01-.508-2H14a1 1 0 110-2h11.056c.082-.73.256-1.414.508-2zm9.144-21.707a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L30 15.586l3.293-3.293a1 1 0 011.414 0zM14 25.5a1 1 0 011-1h7a1 1 0 110 2h-7a1 1 0 01-1-1zm0 3.5a1 1 0 011-1h7a1 1 0 110 2h-7a1 1 0 01-1-1z"
      fill="#fff"
    />
  </Svg>
);

export default memo(SessionKnowledgeCheckIcon);
