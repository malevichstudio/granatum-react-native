import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * @storyfied
 * @param props
 * @returns {*}
 * @constructor
 */

const TurnCameraIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="#1E2233" {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.36358 0.363457C5.71505 0.0119856 6.2849 0.0119856 6.63637 0.363457L8.63637 2.36346C8.98784 2.71493 8.98784 3.28478 8.63637 3.63625L6.63637 5.63625C6.2849 5.98772 5.71505 5.98772 5.36358 5.63625C5.01211 5.28478 5.01211 4.71493 5.36358 4.36346L5.82718 3.89985H4.99998C3.28789 3.89985 1.89998 5.28777 1.89998 6.99985V12.9999C1.89998 14.7119 3.28789 16.0999 4.99998 16.0999H5.99998C6.49703 16.0999 6.89998 16.5028 6.89998 16.9999C6.89998 17.4969 6.49703 17.8999 5.99998 17.8999H4.99998C2.29378 17.8999 0.0999756 15.706 0.0999756 12.9999V6.99985C0.0999756 4.29366 2.29378 2.09985 4.99998 2.09985H5.82718L5.36358 1.63625C5.01211 1.28478 5.01211 0.714929 5.36358 0.363457ZM12 2.09985H13C15.7062 2.09985 17.9 4.29366 17.9 6.99985V12.9999C17.9 15.706 15.7062 17.8999 13 17.8999H12.1728L12.6364 18.3635C12.9878 18.7149 12.9878 19.2848 12.6364 19.6362C12.2849 19.9877 11.7151 19.9877 11.3636 19.6362L9.36358 17.6362C9.01211 17.2848 9.01211 16.7149 9.36358 16.3635L11.3636 14.3635C11.7151 14.012 12.2849 14.012 12.6364 14.3635C12.9878 14.7149 12.9878 15.2848 12.6364 15.6362L12.1728 16.0999H13C14.7121 16.0999 16.1 14.7119 16.1 12.9999V6.99985C16.1 5.28777 14.7121 3.89985 13 3.89985H12C11.5029 3.89985 11.1 3.49691 11.1 2.99985C11.1 2.5028 11.5029 2.09985 12 2.09985ZM5.00007 8.79985C5.00007 8.35803 5.35825 7.99986 5.80007 7.99986H9.20007C9.6419 7.99986 10.0001 8.35803 10.0001 8.79985V11.1999C10.0001 11.6417 9.6419 11.9999 9.20007 11.9999H5.80007C5.35825 11.9999 5.00007 11.6417 5.00007 11.1999V8.79985ZM10.6415 9.85843C10.5634 9.93654 10.5634 10.0632 10.6415 10.1413L12.4879 11.9877C12.6769 12.1767 13.0001 12.0429 13.0001 11.7756V8.22412C13.0001 7.95685 12.6769 7.823 12.4879 8.01199L10.6415 9.85843Z"
    />
  </Svg>
);

export default memo(TurnCameraIcon);