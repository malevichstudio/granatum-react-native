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

import colors from 'app/theme/variables/colors/defaultColors';
import { injectionKeys } from '../../config';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './sagas';
import { DAEMON } from '../../utils/constants';
import SignInEmailForm from './components/SignInEmailForm';
import messages from './messages';
import Socials from '../Socials';

const SignInPage = ({ navigation }) => {
  useInjectSaga({ key: injectionKeys.signIn, saga, mode: DAEMON });

  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Content contentContainerStyle={styles.content}>
        <ScrollView contentContainerStyle={styles.mainContent}>
          <View>
            <Text authTitle alignCenter>
              <FormattedMessage {...messages.logInToTheApp} />
            </Text>
            <Socials />
            <View style={styles.subTitle}>
              <View style={styles.subTitleLine} />
              <Text style={styles.subTitleText} variantBody2 alignCenter>
                <FormattedMessage {...messages.signInAs} />
              </Text>
              <View style={styles.subTitleLine} />
            </View>
            <SignInEmailForm />
            <TouchableOpacity onPress={() => navigation.push('RecoveryPage')}>
              <Text alignCenter link variantBody2 semiBold>
                <FormattedMessage {...messages.forgotPassword} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <Text variantBody2 gray>
              <FormattedMessage {...messages.notHaveAccountYet} />{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.push('SignUpSocialPage')}>
              <Text link variantBody2 semiBold>
                <FormattedMessage {...messages.signUp} />
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 80,
    paddingBottom: 24,
    paddingHorizontal: 24,
    justifyContent: 'center',
    flex: 1,
  },
  mainContent: { flex: 1, justifyContent: 'space-between' },
  subTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  subTitleText: {
    fontSize: 14,
    marginHorizontal: 8,
    color: colors.mainL3,
  },
  subTitleLine: {
    height: 1,
    backgroundColor: '#DFE1E7',
    flex: 1,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
});

export default SignInPage;
