import React from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Container, Text, Content } from 'native-base';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ArrowLeftDirection from 'app/components/icons/ArrowLeftDirection';
import SignUpEmailForm from './components/SignUpEmailForm';

const SignUpPage = ({ navigation }) => {
  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Content contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.back}>
          <ArrowLeftDirection fill="#000" width={25} height={25} />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.mainContent}>
          <View>
            <Text authTitle alignCenter>
              <FormattedMessage {...messages.registration} />
            </Text>
            <SignUpEmailForm />
          </View>
          <View style={styles.bottom}>
            <Text gray variantBody2 semiBold>
              <FormattedMessage {...messages.alreadyHaveAnAccount} />{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.push('SignInPage')}>
              <Text link variantBody2 semiBold>
                <FormattedMessage {...messages.signIn} />
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Content>
    </Container>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  mainContent: { flex: 1, justifyContent: 'space-between' },
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
