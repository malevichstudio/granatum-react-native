import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import { FormattedMessage } from 'react-intl';

import colors from 'app/theme/variables/colors/defaultColors';

const Message = ({ message }) => {
  return (
    <View style={styles.message}>
      <Text variantBody style={styles.messageText(colors.error)}>
        <FormattedMessage {...message} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    paddingHorizontal: 32,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  messageText: (color) => ({
    lineHeight: 20,
    color,
    textAlign: 'center',
  }),
});

export default Message;
