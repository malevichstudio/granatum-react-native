import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Form } from 'native-base';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';

import InputText from '../../../components/form/InputText';
import RemoteErrors from 'app/components/RemoteErrors';
import Checkbox from 'app/components/form/Checkbox';
import Agreement from 'app/components/Agreement';
import Button from 'app/components/Button';
import { registrationOauth } from '../../Socials/actions';
import messages from '../messages';
import { getValidationSchemaSignUpWithOnlyEmail } from 'app/utils/validation';
import { selectOpenedByLink } from 'app/containers/App/selectors';

const RegistrEmailForm = ({ payload }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const openedByLink = useSelector(selectOpenedByLink);

  const [isAgreed, setIsAgreed] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = (values) => {
    setLoading(true);
    return dispatch(
      registrationOauth({
        ...payload,
        ...values,
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

  function disabledStatus(isValid, values) {
    let isEmpty = true;

    Object.values(values)?.map((el) => {
      if (el && isEmpty) isEmpty = false;
    });

    if (isEmpty) return true;
    if (!isValid) return true;
    if (!isAgreed) return true;
    return false;
  }

  return (
    <ScrollView>
      <Text authTitle alignCenter>
        <FormattedMessage {...messages.almostReady} />
      </Text>
      <Text alignCenter style={styles.text}>
        <FormattedMessage {...messages.forCompleteRegistration} />
      </Text>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={handleSignUp}
        validationSchema={getValidationSchemaSignUpWithOnlyEmail()}>
        {({ handleChange, handleSubmit, values, errors, touched, isValid }) => (
          <Form style={styles.form}>
            <RemoteErrors errors={serverErrors} />
            <InputText
              value={values.email}
              onChangeText={handleChange('email')}
              name="email"
              label={intl.formatMessage(messages.email)}
              error={errors.email}
              touched={touched.email}
              floatingLabel
              keyboardType="email-address"
            />
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
                disabled={disabledStatus(isValid, values)}
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

export default RegistrEmailForm;

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
