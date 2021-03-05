import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Text } from 'native-base';
import Button from 'app/components/Button';
import { signUpGuest } from '../actions';
import messages from '../messages';
import { getValidationSchemaQuest } from '../../../utils/validation';
import RemoteErrors from '../../../components/RemoteErrors';
import InputText from '../../../components/form/InputText';
import { selectOpenedByLink } from 'app/containers/App/selectors';

const SignUpGuestForm = () => {
  const dispatch = useDispatch();
  const openedByLink = useSelector(selectOpenedByLink);

  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const [serverErrors, setServerErrors] = useState(null);

  const handleDispatchSubmit = (values) => {
    setLoading(true);

    let type;
    let id;

    if (openedByLink?.session) {
      type = 'session';
      id = openedByLink?.session;
    } else if (openedByLink?.course) {
      type = 'course';
      id = openedByLink?.course;
    }

    dispatch(
      signUpGuest({
        name: values.name.trim(),
        [type === 'session' ? 'sessionId' : 'courseId']: id,
      }),
    ).catch((errors) => {
      setLoading(false);
      setServerErrors(errors);
    });
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={handleDispatchSubmit}
      validationSchema={getValidationSchemaQuest()}>
      {({ handleChange, handleSubmit, values, isValid, errors, touched }) => (
        <Form style={styles.form}>
          <RemoteErrors errors={serverErrors} />
          <InputText
            value={values.name}
            onChangeText={handleChange('name')}
            name="name"
            label={intl.formatMessage(messages.name)}
            error={errors.name}
            touched={touched.name}
            floatingLabel
          />
          <View style={styles.buttonWrap}>
            <Button
              large
              loading={loading}
              disabled={loading || !isValid || !values.name}
              fullWidth
              variantPrimary
              onPress={handleSubmit}>
              <Text button style={{ color: '#fff' }}>
                <FormattedMessage {...messages.continue} />
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
  },
});

export default SignUpGuestForm;
