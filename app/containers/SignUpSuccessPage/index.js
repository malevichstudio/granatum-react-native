import React from 'react';
import { StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Text, Content } from 'native-base';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import ArrowLeftDirection from 'app/components/icons/ArrowLeftDirection';
import Button from 'app/components/Button';

const SignUpSuccessPage = ({ navigation }) => {
  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Content contentContainerStyle={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignInPage')}
          style={styles.back}>
          <ArrowLeftDirection fill="#000" width={25} height={25} />
        </TouchableOpacity>
        <Text authTitle alignCenter>
          <FormattedMessage {...messages.registration} />
        </Text>
        <Text alignCenter style={styles.text}>
          <FormattedMessage {...messages.successRegistrationMessage} />
        </Text>
        <Text alignCenter black style={styles.thanks}>
          <FormattedMessage {...messages.thankYou} />
        </Text>
        <Button
          large
          fullWidth
          variantPrimary
          onPress={() => navigation.navigate('SignInPage')}>
          <Text button light>
            <FormattedMessage {...messages.continue} />
          </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default SignUpSuccessPage;

const styles = StyleSheet.create({
  content: {
    paddingTop: 50,
    flex: 1,
    paddingHorizontal: 25,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 20,
    color: '#383A48',
  },
  thanks: {
    fontSize: 17,
    color: '#383A48',
    marginBottom: 20,
  },
  back: {
    marginBottom: 45,
  },
});
