import React from 'react';
import { Text } from 'native-base';
import { uid } from 'react-uid';
import { FormattedMessage } from 'react-intl';
import { StyleSheet } from 'react-native';

/**
 * Серверные ошибки валидации
 */
export default function RemoteErrors({ errors }) {
  if (errors) {
    return errors.map((text) => (
      <Text style={styles.errorText} key={uid(text)}>
        <FormattedMessage {...{ id: text }} />
      </Text>
    ));
  }

  return null;
}

const styles = StyleSheet.create({
  errorText: {
    color: 'rgb(237, 47, 47)',
  },
});
