import React, { useState, useEffect, memo } from 'react';
import { SvgUri } from 'react-native-svg';
import { Image } from 'react-native';

import placeholderImage from 'app/components/images/no-image.png';

const ImageRender = ({ uri, style }) => {
  const [size, setSize] = useState(null);

  useEffect(() => {
    if (!/no\-image/.test(uri)) {
      Image.getSize(uri, (width, height) => {
        setSize({
          width,
          height,
        });
      });
    }
  }, [uri]);

  const isPlaceholder = /no\-image/.test(uri);

  if (isPlaceholder) {
    return (
      <Image style={style} resizeMode="contain" source={placeholderImage} />
    );
  }

  if (!uri || !size) {
    return null;
  }

  const format = uri?.slice(uri?.lastIndexOf('.') + 1);

  if (format?.toLowerCase() === 'svg') {
    return <SvgUri width={180} height={180} uri={uri} />;
  }

  return <Image style={style} resizeMode="contain" source={{ uri }} />;
};

export default memo(ImageRender);
