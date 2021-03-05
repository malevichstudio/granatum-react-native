import React, { memo } from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const EditIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.621 3.207a3 3 0 00-4.242 0L3.293 15.293a1 1 0 00-.274.51l-1 5a1 1 0 001.177 1.177l5-1a1 1 0 00.511-.273L20.793 8.621a3 3 0 000-4.242L19.62 3.207zm-2.828 1.414a1 1 0 011.414 0l1.172 1.172a1 1 0 010 1.414L18 8.586 15.414 6l1.379-1.379zM14 7.414l-9.079 9.079-.646 3.232 3.232-.646 9.079-9.08L14 7.415z"
    />
  </Svg>
);

export default memo(EditIcon);
