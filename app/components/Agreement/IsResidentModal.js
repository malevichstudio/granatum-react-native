import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Button } from 'native-base';
import messages from './messages';
import CloseIcon from 'app/components/icons/CloseIcon';

const IsResidentModal = ({ open, onClose, showPdf }) => {
  if (!open) return null;

  const handleClickYes = () => {
    onClose();
    setTimeout(() => showPdf('ru'));
  };

  const handleClickNo = () => {
    onClose();
    setTimeout(() => showPdf('en'));
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={onClose} style={styles.close}>
              <CloseIcon fill="#7e7e7e" />
            </TouchableOpacity>
            <Text alignCenter>
              <FormattedMessage {...messages.isResident} />
            </Text>
            <View style={styles.box}>
              <Button transparent dark onPress={handleClickYes}>
                <Text semiBold>
                  <FormattedMessage {...messages.yes} />
                </Text>
              </Button>
              <Button transparent dark onPress={handleClickNo}>
                <Text semiBold>
                  <FormattedMessage {...messages.no} />
                </Text>
              </Button>
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
    backgroundColor: 'rgba(0,0,0, 0.4)',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  close: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: -15,
    marginTop: -15,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default IsResidentModal;
