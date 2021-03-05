import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Form, Text } from 'native-base';
import { injectionKeys } from '../../../config';
import { useInjectSaga } from '../../../utils/injectSaga';
import saga from '../sagas';
import { DAEMON } from '../../../utils/constants';
import { setPassword } from '../actions';
import messages from '../messages';
import { getValidationSchemaSignUpFinishing } from '../../../utils/validation';
import RemoteErrors from '../../../components/RemoteErrors';
import TextFieldPassword from '../../../components/form/TextFieldPassword';
import Checkbox from '../../../components/form/Checkbox';
import Agreement from '../../../components/Agreement';
import Button from '../../../components/Button';

const SignUpEmailForm = ({ route }) => {
  useInjectSaga({ key: injectionKeys.signUp, saga, mode: DAEMON });

  const [loading, setLoading] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const intl = useIntl();
  const [serverErrors, setServerErrors] = useState(null);
  const dispatch = useDispatch();

  const handleSignUp = (values) => {
    setLoading(true);
    return dispatch(
      setPassword({
        password: values.password.trim(),
        // this is stupid to send this to the backend, but backend-folks doesn't
        // want to remove this field from required
        token: route.params.token,
        projectId: route.params.projectId,
        courseId: route.params.courseId,
        sessionId: route.params.sessionId,
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

  function togglePasswordVisibility() {
    setShowPassword((showPasswordPrev) => !showPasswordPrev);
  }

  function disabledStatus(isValid, values) {
    let isEmpty = true;

    Object.values(values)?.map((el) => {
      if (el && isEmpty) {
        isEmpty = false;
      }
    });

    return isEmpty || !isValid || !isAgreed;
  }

  return (
    <Formik
      initialValues={{ password: '' }}
      onSubmit={handleSignUp}
      validationSchema={getValidationSchemaSignUpFinishing()}>
      {({ handleChange, handleSubmit, values, errors, touched, isValid }) => (
        <Form style={styles.form}>
          <RemoteErrors errors={serverErrors} />

          <TextFieldPassword
            value={values.password}
            onChangeText={handleChange('password')}
            name="password"
            label={intl.formatMessage(messages.password)}
            error={errors.password}
            touched={touched.password}
            secureTextEntry={!showPassword}
            floatingLabel
            showPassword={showPassword}
            onAdornmentPress={togglePasswordVisibility}
            withRequirements
          />
          <View>
            <Checkbox
              checked={isAgreed}
              onChange={setIsAgreed}
              label={<Agreement />}
            />
          </View>
          <View style={styles.buttonWrap}>
            <Button
              large
              fullWidth
              variantPrimary
              loading={loading}
              disabled={disabledStatus(isValid, values)}
              onPress={handleSubmit}>
              <Text button light>
                <FormattedMessage {...messages.signIn} />
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
    marginTop: 8,
  },
});

export default SignUpEmailForm;
