import React from 'react';
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import RNRestart from 'react-native-restart';

import { selectSocketConnectError } from 'app/containers/App/selectors';
import BottomModal from 'app/components/BottomModal';
import Button from 'app/components/Button';
import { buttonLarge } from 'app/styles/buttons';
import messages from './messages';

const SocketErrorModal = () => {
  const { reload, status } = useSelector(selectSocketConnectError);
  if (!status) {
    return null;
  }
  return (
    <BottomModal>
      <Text variantH6 dark style={styles.textBox}>
        <FormattedMessage {...messages.connectionInterrupted} />
      </Text>
      <Text variantBody1 gray>
        <FormattedMessage
          {...messages[reload ? 'socketFailed' : 'socketInfo']}
        />
      </Text>
      <Button
        variantPrimary
        fullWidth
        loading={!reload}
        onPress={() => RNRestart.Restart()}
        buttonTextStyles={buttonLarge}
        styles={styles.button}>
        <Text button light>
          <FormattedMessage {...messages.reloadApp} />
        </Text>
      </Button>
    </BottomModal>
  );
};

export default SocketErrorModal;

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
  textBox: {
    marginBottom: 24,
  },
});
