import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Form, Text } from 'native-base';
import Button from 'app/components/Button';
import { restorePassword } from '../actions';
import messages from '../messages';
import { getValidationSchemaRestorePassword } from '../../../utils/validation';
import RemoteErrors from '../../../components/RemoteErrors';
import TextFieldPassword from '../../../components/form/TextFieldPassword';

const RestorePasswordForm = ({ token }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const intl = useIntl();
  const [serverErrors, setServerErrors] = useState(null);

  const handleDispatchSubmit = (values) => {
    setLoading(true);
    dispatch(restorePassword({ ...values, token }))
      .then(handleDone)
      .catch((errors) => {
        setLoading(false);
        setServerErrors(errors);
      });
  };

  function togglePasswordVisibility() {
    setShowPassword((showPasswordPrev) => !showPasswordPrev);
  }

  function handleDone() {
    setLoading(false);
  }

  return (
    <Formik
      initialValues={{ password: '' }}
      onSubmit={handleDispatchSubmit}
      validationSchema={getValidationSchemaRestorePassword()}>
      {({ handleChange, handleSubmit, values, isValid, errors, touched }) => (
        <Form style={styles.form}>
          <RemoteErrors errors={serverErrors} />
          <TextFieldPassword
            value={values.password}
            onChangeText={handleChange('password')}
            name="password"
            label={intl.formatMessage(messages.newPassword)}
            error={errors.password}
            touched={touched.password}
            secureTextEntry={!showPassword}
            floatingLabel
            showPassword={showPassword}
            onAdornmentPress={togglePasswordVisibility}
            withRequirements
            requirementsPositionIsBottom
          />
          <View style={styles.buttonWrap}>
            <Button
              fullWidth
              variantPrimary
              loading={loading}
              disabled={loading || !isValid || !values.password}
              onPress={handleSubmit}>
              <Text button light>
                <FormattedMessage {...messages.restorePasswordSend} />
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
    marginBottom: 15,
    minHeight: 350,
  },
});

export default RestorePasswordForm;
