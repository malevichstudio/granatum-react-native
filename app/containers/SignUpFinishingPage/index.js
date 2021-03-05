import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Container, Text, Content } from 'native-base';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import SignUpEmailForm from './components/SignUpEmailForm';

const SignUpPage = ({ route }) => {
  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Content contentContainerStyle={styles.content}>
        <View>
          <Text authTitle alignCenter>
            <FormattedMessage {...messages.registrationCompletion} />
          </Text>
          <SignUpEmailForm route={route} />
        </View>
      </Content>
    </Container>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  back: {
    marginBottom: 40,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    paddingBottom: 24,
  },
});
