import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * @storyfied
 * @param props
 * @returns {*}
 * @constructor
 */

const SpeakerIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}>
    <Path d="M2.452 3.705C3.26 3.443 5.056 3 8 3s4.74.443 5.548.705a.126.126 0 01.06.041c.017.02.037.055.046.106.14.781.346 2.256.346 4.148a23.99 23.99 0 01-.346 4.148.226.226 0 01-.046.106.126.126 0 01-.06.04 7.84 7.84 0 01-.15.048.584.584 0 00-.399.58L13 13v.887c0 .32.297.559.606.476.213-.058.4-.114.56-.166a2.164 2.164 0 001.456-1.696C15.778 11.629 16 10.034 16 8c0-2.034-.222-3.629-.378-4.5a2.164 2.164 0 00-1.455-1.697C13.154 1.474 11.149 1 8 1s-5.154.474-6.167.803A2.164 2.164 0 00.378 3.5 25.982 25.982 0 000 8c0 2.034.222 3.629.378 4.5.136.764.66 1.438 1.455 1.697.162.052.348.108.561.166A.484.484 0 003 13.887V13v-.079a.584.584 0 00-.397-.579 7.837 7.837 0 01-.15-.047.126.126 0 01-.061-.041.225.225 0 01-.046-.106A23.989 23.989 0 012 8c0-1.892.206-3.367.346-4.148a.226.226 0 01.046-.106.126.126 0 01.06-.04z" />
    <Path d="M12 14.278a.491.491 0 01-.42.489C10.61 14.903 9.422 15 8 15c-1.422 0-2.61-.097-3.58-.233a.491.491 0 01-.42-.489V13c0-1.5 1.843-2.5 3.5-2.5h1c1.657 0 3.5 1 3.5 2.5v1.278zM8 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
  </Svg>
);

export default memo(SpeakerIcon);
