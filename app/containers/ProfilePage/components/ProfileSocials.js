import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import messages from '../messages';
import { authProviders } from 'app/config';
import { selectUser } from 'app/containers/App/selectors';
import GoogleIcon from 'app/components/icons/GoogleIcon';
import OAuthSwitcher from './OAuthSwitcher';

const ProfileSocials = () => {
  const user = useSelector(selectUser);
  const [isGoogle, /* isFb, */ isVk] = [
    user.networks.includes(authProviders.google.apiSlug),
    user.networks.includes(authProviders.fb.apiSlug),
    user.networks.includes(authProviders.vk.apiSlug),
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.item}>
        <GoogleIcon />
        <Text variantBody1 style={styles.text}>
          <FormattedMessage
            {...(isGoogle ? messages.linkedAs : messages.linkGoogleAccount)}
          />{' '}
          {isGoogle && user.name}
        </Text>
        <OAuthSwitcher checked={isGoogle} provider="google" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { backgroundColor: '#fff', flex: 1 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    marginRight: 'auto',
  },
});

export default ProfileSocials;
