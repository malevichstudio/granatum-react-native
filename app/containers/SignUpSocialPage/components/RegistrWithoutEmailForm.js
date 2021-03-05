import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Form } from 'native-base';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';

import RemoteErrors from 'app/components/RemoteErrors';
import Checkbox from 'app/components/form/Checkbox';
import Agreement from 'app/components/Agreement';
import Button from 'app/components/Button';
import { registrationOauth } from '../../Socials/actions';
import messages from '../messages';
import { selectOpenedByLink } from 'app/containers/App/selectors';

const RegistrWithoutEmailForm = ({ payload }) => {
  const dispatch = useDispatch();
  const openedByLink = useSelector(selectOpenedByLink);

  const [isAgreed, setIsAgreed] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    dispatch(
      registrationOauth({
        ...payload,
        invite: openedByLink?.courseToken,
        sessionId: openedByLink?.sessionId,
      }),
    )
      .then(() => {
        setLoading(false);
      })
      .catch((errors) => {
        setLoading(false);
        setServerErrors(errors);
      });
  };

  return (
    <ScrollView>
      <Text authTitle alignCenter>
        <FormattedMessage {...messages.almostReady} />
      </Text>
      <Text alignCenter style={styles.text}>
        <FormattedMessage {...messages.yourEmail} />:{' '}
        <Text semiBold>{payload?.email}</Text>
      </Text>
      <Formik initialValues={{}} onSubmit={handleSignUp}>
        {({ handleSubmit }) => (
          <Form style={styles.form}>
            <RemoteErrors errors={serverErrors} />
            <Checkbox
              checked={isAgreed}
              onChange={setIsAgreed}
              label={<Agreement />}
            />
            <View style={styles.buttonWrap}>
              <Button
                large
                full
                loading={loading}
                disabled={!isAgreed}
                onPress={handleSubmit}>
                <Text button light>
                  <FormattedMessage {...messages.signUp} />
                </Text>
              </Button>
            </View>
          </Form>
        )}
      </Formik>
    </ScrollView>
  );
};

export default RegistrWithoutEmailForm;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginTop: 20,
  },
  buttonWrap: {
    marginTop: 24,
  },
  form: {
    marginBottom: 15,
    marginTop: 10,
  },
});
