import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const BottomModal = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      <Animatable.View animation="slideInUp" duration={600}>
        <View style={styles.inner}>{children}</View>
      </Animatable.View>
    </View>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 100,
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  inner: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
