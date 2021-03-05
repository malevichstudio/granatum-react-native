import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Text } from 'native-base';
import { injectionKeys } from '../../../config';
import { useInjectSaga } from '../../../utils/injectSaga';
import saga from '../sagas';
import { DAEMON } from '../../../utils/constants';
import { signUp } from '../actions';
import messages from '../messages';
import { getValidationSchemaSignUp } from '../../../utils/validation';
import RemoteErrors from '../../../components/RemoteErrors';
import InputText from '../../../components/form/InputText';
import TextFieldPassword from '../../../components/form/TextFieldPassword';
import Checkbox from '../../../components/form/Checkbox';
import Agreement from '../../../components/Agreement';
import Button from '../../../components/Button';
import { selectUserLanguage } from 'app/containers/App/selectors';
import { selectOpenedByLink } from 'app/containers/App/selectors';

const SignUpEmailForm = () => {
  useInjectSaga({ key: injectionKeys.signUp, saga, mode: DAEMON });

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const intl = useIntl();
  const locale = useSelector(selectUserLanguage);
  const openedByLink = useSelector(selectOpenedByLink);

  const [loading, setLoading] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);

  const handleSignUp = (values) => {
    setLoading(true);
    return dispatch(
      signUp({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        // this is stupid to send this to the backend, but backend-folks doesn't
        // want to remove this field from required
        lang: locale,
        invite: openedByLink?.courseToken,
        sessionId: openedByLink?.sessionId,
      }),
    )
      .then(() => {
        setLoading(false);
        navigation.push('SignUpSuccessPage');
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

    if (isEmpty) {
      return true;
    }
    if (!isValid) {
      return true;
    }
    if (!isAgreed) {
      return true;
    }
    return false;
  }

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={handleSignUp}
      validationSchema={getValidationSchemaSignUp()}>
      {({ handleChange, handleSubmit, values, errors, touched, isValid }) => (
        <Form style={styles.form}>
          <RemoteErrors errors={serverErrors} />
          <InputText
            value={values.name}
            onChangeText={handleChange('name')}
            name="name"
            label={intl.formatMessage(messages.name)}
            error={errors.name}
            touched={touched.name}
            maxLength={20}
            floatingLabel
          />
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
                <FormattedMessage {...messages.signUp} />
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
    marginTop: 16,
  },
});

export default SignUpEmailForm;
