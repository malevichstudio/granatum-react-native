import React from 'react';
import {
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Container, Text, Content, View } from 'native-base';
import { FormattedMessage } from 'react-intl';
import { injectionKeys } from '../../config';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './sagas';
import { DAEMON } from '../../utils/constants';
import SignUpGuestForm from './components/SignUpGuestForm';
import messages from './messages';

const SignUpGuestPage = ({ navigation }) => {
  useInjectSaga({ key: injectionKeys.signUpGuest, saga, mode: DAEMON });

  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Content contentContainerStyle={styles.content}>
        <ScrollView>
          <Text authTitle alignCenter>
            <FormattedMessage {...messages.welcome} />
          </Text>
          <View style={styles.subTitle}>
            <Text variantBody2 gray style={styles.subTitleText} alignCenter>
              <FormattedMessage {...messages.enterYourNameToContinueExt} />
            </Text>
          </View>
          <SignUpGuestForm />
          <View style={styles.bottom}>
            <TouchableOpacity onPress={() => navigation.push('SignInPage')}>
              <Text link variantBody2>
                <FormattedMessage {...messages.signIn} />
              </Text>
            </TouchableOpacity>
            <Text variantBody2>
              <FormattedMessage {...messages.logInAsAdmin} />{' '}
            </Text>
          </View>
        </ScrollView>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 100,
    paddingBottom: 24,
    paddingHorizontal: 24,
    justifyContent: 'center',
    flex: 1,
  },
  subTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 24,
  },
  subTitleText: {
    marginHorizontal: 8,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default SignUpGuestPage;
