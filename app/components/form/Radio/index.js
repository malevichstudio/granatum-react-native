import React from 'react';
import { StyleSheet, View } from 'react-native';

const Radio = ({ selected }) => {
  return (
    <View style={styles.box(selected)}>
      {selected && <View style={styles.dot} />}
    </View>
  );
};

const styles = StyleSheet.create({
  box: (checked) => ({
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    borderColor: checked ? '#3294E6' : '#CCCFDB',
    borderWidth: 2,
    backgroundColor: checked ? '#3294E6' : '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  dot: {
    width: 9,
    height: 9,
    borderRadius: 9 / 2,
    backgroundColor: '#fff',
  },
});

export default Radio;
