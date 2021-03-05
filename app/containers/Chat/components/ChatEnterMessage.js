import React from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useIntl } from 'react-intl';

import EnterMessageIcon from 'app/components/icons/EnterMessageIcon';
import colors from 'app/theme/variables/colors/defaultColors';
import { createChatMessage } from '../actions';
import messages from '../messages';

const ChatEnterMessage = ({ chatId, sendHandler }) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const onSubmit = (values, { resetForm }) => {
    dispatch(
      createChatMessage({
        ...values,
        chatId,
      }),
    );
    resetForm();
    sendHandler();
  };

  const validate = (values) => {
    const errors = {};
    if (!values.text) {
      errors.text = true;
    }
    return errors;
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ text: '' }}
        onSubmit={onSubmit}
        validate={validate}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.inner}>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('text')}
              onBlur={handleBlur('text')}
              placeholder={intl.formatMessage(messages.typeMessage)}
              value={values.text}
              multiline={true}
              maxLength={1000}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              style={styles.submit}>
              <EnterMessageIcon />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ChatEnterMessage;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    marginTop: 'auto',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.01,
    shadowRadius: 1,
    elevation: 2,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
  },
  submit: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
