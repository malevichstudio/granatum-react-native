import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Form, Text } from 'native-base';
import messages from '../messages';
import { getValidationSchemaRecovery } from '../../../utils/validation';
import RemoteErrors from '../../../components/RemoteErrors';
import InputText from '../../../components/form/InputText';
import Button from 'app/components/Button';
import { askPasswordResetLink } from '../actions';

const RecoveryForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const [serverErrors, setServerErrors] = useState(null);

  function handleDispatchSubmit(values) {
    setLoading(true);
    return dispatch(askPasswordResetLink(values))
      .then(handleDone)
      .catch((errors) => {
        handleDone();
        setServerErrors(errors);
      });
  }

  function handleDone() {
    setLoading(false);
  }

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={handleDispatchSubmit}
      validationSchema={getValidationSchemaRecovery()}>
      {({ handleChange, handleSubmit, values, isValid, errors, touched }) => (
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
          />
          <View style={styles.buttonWrap}>
            <Button
              fullWidth
              variantPrimary
              loading={loading}
              disabled={loading || !isValid || !values.email}
              onPress={handleSubmit}>
              <Text button light>
                <FormattedMessage {...messages.send} />
              </Text>
            </Button>
          </View>
        </Form>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  buttonWrap: {
    marginTop: 24,
  },
  form: {
    marginBottom: 16,
  },
});

export default RecoveryForm;
