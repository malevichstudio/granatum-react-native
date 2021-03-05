import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Container, Text, Content } from 'native-base';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { injectionKeys } from '../../config';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './sagas';
import { DAEMON } from '../../utils/constants';
import RestorePasswordForm from './components/RestorePasswordForm';
import messages from './messages';
import { checkToken } from './actions';

const RestorePage = ({ route }) => {
  useInjectSaga({ key: injectionKeys.restore, saga, mode: DAEMON });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken({ token: route?.params?.token }));
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Content contentContainerStyle={styles.content}>
        <ScrollView style={{ flex: 1 }}>
          <Text authTitle alignCenter>
            <FormattedMessage {...messages.passwordRecovery} />
          </Text>
          <RestorePasswordForm token={route?.params?.token} />
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
  },
  subTitleText: {
    fontSize: 14,
    marginHorizontal: 8,
    color: '#54555E',
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
  text: {
    fontSize: 14,
  },
});

export default RestorePage;
