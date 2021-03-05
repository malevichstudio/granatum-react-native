import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Pdf from 'react-native-pdf';

import CloseIcon from 'app/components/icons/CloseIcon';

const PdfModal = ({ open, onClose, type }) => {
  if (!open) {
    return null;
  }

  const source = {
    uri:
      type !== 'en'
        ? 'https://next.granatum.solutions/601ff01b7187476e93f9659668acc5d5.pdf'
        : 'https://next.granatum.solutions/1cfad6212a611f03e78495ee9f1bdf49.pdf',
    cache: true,
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={onClose} style={styles.close}>
              <CloseIcon fill="#7e7e7e" />
            </TouchableOpacity>
            <View style={styles.container}>
              <Pdf source={source} style={styles.pdf} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  close: {
    position: 'absolute',
    top: 100,
    right: 35,
    zIndex: 999999,
  },
  modalView: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default PdfModal;
