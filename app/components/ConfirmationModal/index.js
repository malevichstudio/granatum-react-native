import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from 'native-base';

import { selectConfirmModal } from 'app/containers/App/selectors';
import { hideConfirmModal } from 'app/containers/App/actions';
import BottomModal from 'app/components/BottomModal';
import Button from '../Button';

function ConfirmationModal() {
  const dispatch = useDispatch();
  const confirmModal = useSelector(selectConfirmModal);

  function hideModal() {
    dispatch(hideConfirmModal());
  }

  if (!confirmModal?.visible) {
    return null;
  }

  return (
    <BottomModal>
      {confirmModal?.title ? (
        <Text variantBody1 style={styles.title}>
          {confirmModal?.title}
        </Text>
      ) : null}
      {confirmModal?.subtitle ? (
        <Text variantBody1 style={styles.title}>
          {confirmModal?.subtitle}
        </Text>
      ) : null}
      {confirmModal?.confirmText ? (
        <Button
          full
          variantPrimary
          style={styles.button}
          onPress={() => {
            confirmModal?.onConfirm && confirmModal.onConfirm();
            hideModal();
          }}>
          {confirmModal?.confirmText}
        </Button>
      ) : null}
      {confirmModal?.cancelText ? (
        <Button
          textPrimary
          variantLink
          centered
          onPress={() => {
            confirmModal?.onCancel && confirmModal.onCancel();
            hideModal();
          }}>
          {confirmModal?.cancelText}
        </Button>
      ) : null}
    </BottomModal>
  );
}

export default ConfirmationModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
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
  title: { marginBottom: 16 },
  button: { marginBottom: 8, height: 56 },
});
