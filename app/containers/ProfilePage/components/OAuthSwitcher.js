import React from 'react';
import { View } from 'react-native';
import { Switch } from 'native-base';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { GoogleSignin } from '@react-native-community/google-signin';

import { getNameByProvider } from 'app/utils/oauthHelpers';
import { connectSocial, deleteSocial } from '../actions';
import messages from '../messages';
import ENV from '../../../../env';
import { showConfirmModal } from 'app/containers/App/actions';
import colors from 'app/theme/variables/colors/defaultColors';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: ENV.GOOGLE_CLIENT_ID,
  iosClientId: ENV.GOOGLE_CLIENT_ID_IOS,
  offlineAccess: true,
});

const OAuthSwitcher = ({ checked, provider }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const handleChange = (value) => {
    if (value) {
      signIn();
    } else {
      dispatch(
        showConfirmModal({
          title: `${intl.formatMessage(
            messages.confirmDeleteSocial,
          )} ${getNameByProvider(provider)} ${intl.formatMessage(
            messages.account,
          )}?`,
          confirmText: intl.formatMessage(messages.remove),
          cancelText: intl.formatMessage(messages.cancel),
          onConfirm: handleConfirm,
        }),
      );
    }
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      dispatch(
        connectSocial({
          provider,
          token: response?.serverAuthCode,
        }),
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  function handleConfirm() {
    dispatch(
      deleteSocial({
        provider,
      }),
    );
  }

  return (
    <View>
      <Switch
        value={checked}
        onValueChange={handleChange}
        trackColor={{ true: colors?.primary }}
      />
    </View>
  );
};

export default OAuthSwitcher;
