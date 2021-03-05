import React from 'react';
import { StatusBar, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Text, Content, Button } from 'native-base';
import { FormattedMessage } from 'react-intl';

import colors from 'app/theme/variables/colors/defaultColors';
import ArrowLeftDirection from 'app/components/icons/ArrowLeftDirection';
import RegistrWithoutEmailForm from './components/RegistrWithoutEmailForm';
import RegistrEmailForm from './components/RegistrEmailForm';
import messages from './messages';
import Socials from '../Socials';

const SignUpSocialPage = ({ navigation, route }) => {
  let content = null;

  if (!route?.params?.payload) {
    content = <MainContent navigation={navigation} />;
  } else if (route?.params?.payload?.email) {
    content = <RegistrWithoutEmailForm payload={route?.params?.payload} />;
  } else if (route?.params?.payload?.username) {
    content = <RegistrEmailForm payload={route?.params?.payload} />;
  }

  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Content contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.back}>
          <ArrowLeftDirection fill="#000" width={25} height={25} />
        </TouchableOpacity>
        {content}
        <View style={styles.bottom}>
          <Text gray variantBody2>
            <FormattedMessage {...messages.alreadyHaveAnAccount} />{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.push('SignInPage')}>
            <Text link variantBody2 semiBold>
              <FormattedMessage {...messages.signIn} />
            </Text>
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
};

const MainContent = ({ navigation }) => {
  return (
    <View style={styles.mainContent}>
      <Text authTitle alignCenter>
        <FormattedMessage {...messages.registration} />
      </Text>
      <Socials />
      <View style={styles.subTitle}>
        <View style={styles.subTitleLine} />
        <Text style={styles.subTitleText} alignCenter variantBody2>
          <FormattedMessage {...messages.signInOr} />
        </Text>
        <View style={styles.subTitleLine} />
      </View>
      <Button
        large
        fullWidth
        variantSecondary
        onPress={() => navigation.push('SignUpPage')}>
        <Text button darkGray>
          <FormattedMessage {...messages.registerViaEmail} />
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    paddingHorizontal: 24,
    flex: 1,
    paddingTop: 16,
  },
  mainContent: { flex: 1 },
  back: {
    marginBottom: 40,
  },
  subTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
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
    paddingBottom: 25,
  },
});

export default SignUpSocialPage;
