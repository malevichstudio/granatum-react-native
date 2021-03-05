import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import useSessionColors from 'app/hooks/useSessionColors';

const Background = ({
  backgroundType,
  backgroundColor,
  backgroundImage,
  children,
  style,
}) => {
  const { sessionColors } = useSessionColors(backgroundColor);

  if (backgroundType === 'image' && backgroundImage) {
    return (
      <ImageBackground
        resizeMode="cover"
        source={{ uri: backgroundImage }}
        style={{
          width: '100%',
          flex: 1,
          paddingVertical: 24,
          // paddingHorizontal: 16,
          resizeMode: 'cover',
        }}>
        {children}
      </ImageBackground>
    );
  }

  if (backgroundType === 'color' && sessionColors[backgroundColor]) {
    return (
      <View
        style={[
          style || styles.wrapper,
          { backgroundColor: sessionColors[backgroundColor] },
        ]}>
        {children}
      </View>
    );
  }

  return <View style={style || styles.wrapper}>{children}</View>;
};

export default Background;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 15,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
});
