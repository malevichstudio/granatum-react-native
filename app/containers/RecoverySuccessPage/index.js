import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Container, Button, Text, Content } from 'native-base';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const RecoverySuccessPage = ({ navigation }) => {
  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Content contentContainerStyle={styles.content}>
        <Text authTitle alignCenter>
          <FormattedMessage {...messages.passwordRecovery} />
        </Text>
        <Text alignCenter gray variantBody2 style={styles.text}>
          <FormattedMessage {...messages.successRecoveryMessage} />
        </Text>
        <Text alignCenter variantSubtitle1 grayDark style={styles.thanks}>
          <FormattedMessage {...messages.thankYou} />
        </Text>
        <Button
          large
          full
          primary
          onPress={() => navigation.navigate('SignInPage')}>
          <Text button>
            <FormattedMessage {...messages.continue} />
          </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default RecoverySuccessPage;

const styles = StyleSheet.create({
  content: {
    paddingTop: 100,
    flex: 1,
    paddingHorizontal: 24,
  },
  text: {
    marginVertical: 24,
  },
  thanks: {
    marginBottom: 24,
  },
});
