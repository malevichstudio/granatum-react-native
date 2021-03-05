import React from 'react';
import {
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Container, Text, Content } from 'native-base';
import { FormattedMessage } from 'react-intl';

import colors from 'app/theme/variables/colors/defaultColors';
import ArrowLeftDirection from 'app/components/icons/ArrowLeftDirection';
import { injectionKeys } from '../../config';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './sagas';
import { DAEMON } from '../../utils/constants';
import RecoveryForm from './components/RecoveryForm';
import messages from './messages';

const RecoveryPage = ({ navigation }) => {
  useInjectSaga({ key: injectionKeys.recovery, saga, mode: DAEMON });

  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Content contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.back}>
          <ArrowLeftDirection fill="#000" width={25} height={25} />
        </TouchableOpacity>
        <ScrollView>
          <Text authTitle alignCenter>
            <FormattedMessage {...messages.passwordRecovery} />
          </Text>
          <View style={styles.subTitle}>
            <Text variantBody2 style={styles.subTitleText} alignCenter>
              <FormattedMessage {...messages.emailRecovery} />
            </Text>
          </View>
          <RecoveryForm />
        </ScrollView>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 24,
    justifyContent: 'center',
    flex: 1,
  },
  back: {
    marginBottom: 40,
  },
  subTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 24,
  },
  subTitleText: {
    marginHorizontal: 8,
    color: colors.mainL3,
  },
});

export default RecoveryPage;
