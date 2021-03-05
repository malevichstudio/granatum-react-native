import React from 'react';
import { StyleSheet, View, TouchableOpacity, Modal } from 'react-native';
import colors from 'app/theme/variables/colors/defaultColors';

const HeaderDropDownMenu = ({ children, show = false, onRequestClose }) => {
  if (!show) {
    return null;
  }
  return (
    <Modal animationType="fade" isVisible={show} transparent>
      <TouchableOpacity style={{ flex: 1 }} onPress={onRequestClose}>
        <View style={styles.dropdownWrap}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dropdownWrap: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    position: 'absolute',
    right: 10,
    top: 56,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
});

export default HeaderDropDownMenu;
