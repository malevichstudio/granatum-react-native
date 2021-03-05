import React from 'react';
import { StyleSheet, View } from 'react-native';

import Chat from 'app/containers/Chat';
import Header from './Header';

const ChatModal = ({ handleCloseChat }) => {
  return (
    <View style={styles.wrapper}>
      <Header handleCloseChat={handleCloseChat} />
      <Chat />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    flex: 1,
  },
});

export default ChatModal;
