import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import ImageRender from 'app/components/ImageRender';
import { makeSelectImageWidget } from '../../../selectors';

const ImageWidget = ({ id }) => {
  const selectImageWidget = useMemo(() => makeSelectImageWidget(id), [id]);
  const widget = useSelector(selectImageWidget);

  return (
    <View style={styles.wrapper}>
      <ImageRender
        style={styles.image}
        resizeMode="contain"
        uri={widget?.src}
      />
    </View>
  );
};

export default memo(ImageWidget);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '100%' },
});
