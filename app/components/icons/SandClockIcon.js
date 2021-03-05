import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

const SandClockIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}>
    <Path d="M6.777 5.139l-.05-.038a8.935 8.935 0 01-.485-.395A3.097 3.097 0 015.636 4h4.728c-.185.3-.393.517-.606.706-.147.131-.299.25-.486.395l-.05.038c-.16.124-.377.29-.574.469A3.895 3.895 0 008 6.347a3.895 3.895 0 00-.648-.74c-.198-.177-.414-.344-.575-.468zM10.778 13a4.045 4.045 0 00-.253-.703C9.515 11.614 8.475 11 8 11c-.476 0-1.516.614-2.525 1.297a4.044 4.044 0 00-.253.703h5.556z" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 0C2.92 0 1.945.891 2.042 2.08c.214 2.622 1.21 3.982 2.206 4.868.233.207.46.383.647.527l.014.011c.19.148.324.25.434.35.099.089.139.14.154.164a.919.919 0 01-.154.164c-.11.1-.243.202-.434.35l-.014.01c-.188.145-.414.32-.647.528-.996.886-1.992 2.246-2.206 4.868C1.945 15.109 2.922 16 4 16h8c1.079 0 2.055-.891 1.958-2.08-.214-2.622-1.21-3.982-2.207-4.868a11.782 11.782 0 00-.646-.527l-.014-.011a7.75 7.75 0 01-.434-.35.917.917 0 01-.154-.164.917.917 0 01.154-.164c.11-.1.243-.202.434-.35l.014-.01c.188-.145.413-.32.646-.528.997-.886 1.993-2.246 2.207-4.868C14.055.891 13.078 0 12 0H4zm1.577 5.454C4.947 4.894 4.224 4.016 4.042 2h7.915c-.181 2.016-.905 2.894-1.534 3.454a9.89 9.89 0 01-.54.438l-.039.03c-.167.129-.358.276-.527.429C8.94 6.69 8.5 7.208 8.5 8s.44 1.31.817 1.65c.17.152.36.3.527.428l.04.03c.186.144.363.282.539.438.63.56 1.353 1.438 1.534 3.454H4.042c.182-2.016.905-2.894 1.535-3.454.176-.156.353-.294.54-.438l.038-.03c.167-.129.359-.276.528-.429.376-.34.817-.857.817-1.649s-.44-1.31-.817-1.65c-.17-.152-.36-.3-.528-.428l-.038-.03a9.87 9.87 0 01-.54-.438z"
    />
  </Svg>
);

export default memo(SandClockIcon);
