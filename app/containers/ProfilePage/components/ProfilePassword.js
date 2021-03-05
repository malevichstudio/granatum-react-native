import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Form, Text } from 'native-base';

import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { authProviders } from 'app/config';

import { updatePassword } from '../actions';
import messages from '../messages';
import { getValidationSchemaProfilePassword } from 'app/utils/validation';
import RemoteErrors from 'app/components/RemoteErrors';
import { selectUser } from 'app/containers/App/selectors';
import Button from 'app/components/Button';
import TextFieldPassword from 'app/components/form/TextFieldPassword';

const ProfilePassword = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const noPassword =
    (user?.networks?.length &&
      !user.networks.includes(authProviders.password.apiSlug)) ||
    !user.passwordSet;

  function handleDispatchSubmit(values) {
    setLoading(true);
    return dispatch(updatePassword(values))
      .then(() => setLoading(false))
      .catch((errors) => {
        setServerErrors(errors);
        setLoading(false);
      });
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleClickShowOldPassword = () => {
    setShowOldPassword((prevShowOldPassword) => !prevShowOldPassword);
  };

  function disabledStatus(isValid, values) {
    let isEmpty = true;

    Object.values(values)?.map((el) => {
      if (el && isEmpty) {
        isEmpty = false;
      }
    });

    if (isEmpty) {
      return true;
    }
    if (!isValid) {
      return true;
    }
    return false;
  }

  const initialValues = {
    password: '',
  };
  if (!noPassword) {
    initialValues.oldPassword = '';
  }

  return (
    <ScrollView style={styles.wrapper}>
      {!user.passwordSet && (
        <Text variantBody2 style={styles.notification}>
          <FormattedMessage {...messages.youHaveNotSetPassword} />
        </Text>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleDispatchSubmit}
        validationSchema={getValidationSchemaProfilePassword(noPassword)}>
        {({ handleChange, handleSubmit, values, isValid, errors, touched }) => (
          <Form style={styles.form}>
            <RemoteErrors errors={serverErrors} />
            {!noPassword ? (
              <TextFieldPassword
                value={values.oldPassword}
                onChangeText={handleChange('oldPassword')}
                name="oldPassword"
                label={intl.formatMessage(messages.oldPassword)}
                error={errors.oldPassword}
                touched={touched.oldPassword}
                secureTextEntry={!showOldPassword}
                floatingLabel
                showPassword={showOldPassword}
                onAdornmentPress={handleClickShowOldPassword}
              />
            ) : null}
            <TextFieldPassword
              value={values.password}
              onChangeText={handleChange('password')}
              name="password"
              label={intl.formatMessage(
                messages[!noPassword ? 'passwordCreate' : 'newPassword'],
              )}
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
                variantPrimary
                fullWidth
                loading={loading}
                large
                disabled={disabledStatus(isValid, values)}
                onPress={handleSubmit}>
                <Text button light>
                  {!user.passwordSet ? (
                    <FormattedMessage {...messages.setPassword} />
                  ) : (
                    <FormattedMessage {...messages.changePassword} />
                  )}
                </Text>
              </Button>
            </View>
          </Form>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: { backgroundColor: '#fff', flex: 1 },
  buttonWrap: {
    marginTop: 24,
  },
  form: {
    marginHorizontal: 24,
    minHeight: 350,
  },
  emailConfirm: {
    marginTop: 16,
  },
  notification: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
});

export default ProfilePassword;
