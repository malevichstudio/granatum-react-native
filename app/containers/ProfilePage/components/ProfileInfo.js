import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Form, Text } from 'native-base';

import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { getValidationSchemaProfileInfo } from 'app/utils/validation';
import RemoteErrors from 'app/components/RemoteErrors';
import InputText from 'app/components/form/InputText';
import { selectUser } from 'app/containers/App/selectors';
import Button from 'app/components/Button';
import CheckCircleIcon from 'app/components/icons/CheckCircleIcon';
import colors from 'app/theme/variables/colors/defaultColors';
import { updateAccountInfo } from '../actions';
import messages from '../messages';

const ProfileInfo = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);

  function handleDispatchSubmit(values) {
    setLoading(true);
    const data = {};
    if (values?.name !== user?.name) {
      data.name = values?.name;
    }
    if (user.email === '-' && values.email) {
      data.email = values.email;
    }

    return dispatch(updateAccountInfo({ ...data }))
      .then(() => setLoading(false))
      .catch((errors) => {
        setServerErrors(errors);
        setLoading(false);
      });
  }

  const renderEmailStatus = () => {
    if (user.email === '-') {
      return null;
    }
    if (user.status === 'AWAITING_CONFIRMATION' && user.email !== '-') {
      return (
        <Text variantBody2 style={styles.emailConfirm}>
          <FormattedMessage {...messages.weHaveSentAnEmail} />
        </Text>
      );
    }
    return (
      <View style={styles.emailConfirm}>
        <Text variantSubtitle2 style={styles.emailConfirmed}>
          <FormattedMessage {...messages.emailConfirmed} />
        </Text>
        <CheckCircleIcon />
      </View>
    );
  };

  return (
    <ScrollView style={styles.wrapper}>
      <Formik
        initialValues={{
          name: user?.name,
          email: user?.email !== '-' ? user?.email : '',
        }}
        onSubmit={handleDispatchSubmit}
        validationSchema={getValidationSchemaProfileInfo()}>
        {({ handleChange, handleSubmit, values, errors, touched }) => (
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
            <InputText
              value={values.email}
              onChangeText={handleChange('email')}
              name="email"
              label={intl.formatMessage(messages.email)}
              error={errors.email}
              touched={touched.email}
              floatingLabel
              disabled={user.status !== 'AWAITING_CONFIRMATION'}
            />
            {renderEmailStatus()}
            <View style={styles.buttonWrap}>
              <Button
                variantPrimary
                fullWidth
                loading={loading}
                large
                onPress={handleSubmit}>
                <Text button light>
                  <FormattedMessage {...messages.save} />
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
  },
  emailConfirm: {
    marginTop: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailConfirmed: {
    color: colors.success,
  },
});

export default ProfileInfo;
