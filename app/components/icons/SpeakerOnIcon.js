import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const SpeakerOnIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path d="M10 8H4.5C4.22386 8 4 8.22386 4 8.5V15.5C4 15.7761 4.22386 16 4.5 16H10L14.8536 20.8536C14.9473 20.9473 15.0745 21 15.2071 21H16.5C16.7761 21 17 20.7761 17 20.5V3.5C17 3.22386 16.7761 3 16.5 3H15.2071C15.0745 3 14.9473 3.05268 14.8536 3.14645L10 8Z" />
  </Svg>
);

export default memo(SpeakerOnIcon);
