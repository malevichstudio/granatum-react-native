import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import CheckedIcon from 'app/components/icons/CheckedIcon';

const Checkbox = ({ checked, onChange, label }) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handleClick} style={styles.box(checked)}>
        {checked && <CheckedIcon style={styles.icon} />}
      </TouchableOpacity>
      <View style={styles.label}>{label}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginTop: 25,
  },
  label: {
    marginLeft: 15,
  },
  box: (checked) => ({
    width: 20,
    height: 20,
    borderRadius: 3,
    borderColor: checked ? '#3294E6' : '#CCCFDB',
    borderWidth: 1,
    backgroundColor: checked ? '#3294E6' : '#fff',
  }),
  icon: {
    right: 1,
    bottom: 1,
  },
});

export default Checkbox;
