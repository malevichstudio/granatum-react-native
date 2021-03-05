import React from 'react';
import { Root } from 'native-base';
import { View, StyleSheet } from 'react-native';
import Routes from '../../Routes';
import { useInjectSaga } from '../../utils/injectSaga';
import { injectionKeys } from '../../config';
import saga from './sagas';
import { DAEMON } from '../../utils/constants';
import SocketErrorModal from 'app/components/SocketErrorModal';
import Jivo from 'app/components/Jivo';
import Notifications from 'app/components/Notifications';
import ConfirmationModal from 'app/components/ConfirmationModal';
import { enableMapSet } from 'immer';

enableMapSet();

const App = () => {
  useInjectSaga({ key: injectionKeys.app, saga, mode: DAEMON });

  return (
    <Root>
      <View style={styles.wrapper}>
        <Routes />
        <SocketErrorModal />
        <Jivo />
        <Notifications />
        <ConfirmationModal />
      </View>
    </Root>
  );
};

export default App;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
});
