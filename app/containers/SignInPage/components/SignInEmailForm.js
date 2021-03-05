import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import * as Keychain from 'react-native-keychain';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Text, Spinner } from 'native-base';
import { injectionKeys } from '../../../config';
import { useInjectSaga } from '../../../utils/injectSaga';
import saga from '../sagas';
import { DAEMON } from '../../../utils/constants';
import { signInViaEmail } from '../actions';
import messages from '../messages';
import { getValidationSchemaLogin } from '../../../utils/validation';
import RemoteErrors from '../../../components/RemoteErrors';
import InputText from '../../../components/form/InputText';
import TextFieldPassword from '../../../components/form/TextFieldPassword';
import { selectOpenedByLink } from 'app/containers/App/selectors';
import Button from 'app/components/Button';

const SignInEmailForm = () => {
  useInjectSaga({ key: injectionKeys.signIn, saga, mode: DAEMON });

  const dispatch = useDispatch();
  const openedByLink = useSelector(selectOpenedByLink);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const intl = useIntl();
  const [serverErrors, setServerErrors] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          setCredentials({
            email: credentials.username,
            password: credentials.password,
          });
        }
        setIsMount(true);
      } catch {
        setIsMount(true);
      }
    })();
  }, []);

  const handleSignIn = async (values) => {
    setLoading(true);
    await Keychain.setGenericPassword(values.email, values.password);
    dispatch(
      signInViaEmail({
        ...values,
        invite: openedByLink?.courseToken,
        sessionId: openedByLink?.session,
        courseId: openedByLink?.course,
        sheetId: openedByLink?.sheet,
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

  if (!isMount) {
    return <Spinner color="blue" />;
  }

  return (
    <Formik
      initialValues={{
        email: credentials?.email || '',
        password: credentials?.password || '',
      }}
      onSubmit={handleSignIn}
      validationSchema={getValidationSchemaLogin()}>
      {({ handleChange, handleSubmit, values, errors, touched }) => (
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
            textContentType="emailAddress"
            autoCapitalize={'none'}
            autoCorrect={false}
            autoCompleteType="email"
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
            autoCapitalize={'none'}
            autoCorrect={false}
            floatingLabel
            autoCompleteType="password"
            showPassword={showPassword}
            onAdornmentPress={togglePasswordVisibility}
            textContentType="password"
          />
          <View style={styles.buttonWrap}>
            <Button
              variantPrimary
              fullWidth
              loading={loading}
              large
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
  },
});

export default SignInEmailForm;
