import React, { useState, useEffect, memo } from 'react';
import { SvgUri } from 'react-native-svg';
import { Image, Dimensions } from 'react-native';

const ImageRender = ({ uri }) => {
  const [size, setSize] = useState(null);

  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      setSize({
        width,
        height,
      });
    });
  }, [uri]);

  const dimensions = Dimensions.get('window');
  const format = uri?.slice(uri?.lastIndexOf('.') + 1);

  if (format.toLowerCase() === 'svg') {
    return <SvgUri width={180} height={180} uri={uri} />;
  }

  if (!size) return null;

  const style = { ...size };
  if (size.width > dimensions.width) {
    style.width = '100%';

    const ratio = dimensions.width / size.width;
    style.height = size.height * ratio;
  }

  return <Image style={style} resizeMode="contain" source={{ uri }} />;
};

export default memo(ImageRender);
