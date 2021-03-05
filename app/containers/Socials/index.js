import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleSignin } from '@react-native-community/google-signin';

import ENV from '../../../env';
import { signInViaSocial } from './actions';
import { injectionKeys } from 'app/config';
import { useInjectSaga } from 'app/utils/injectSaga';
import { DAEMON } from 'app/utils/constants';
import saga from './sagas';
import GoogleIcon from 'app/components/icons/GoogleIcon';
// import VkIcon from 'app/components/icons/VkIcon';
import { selectOpenedByLink } from 'app/containers/App/selectors';

import { navigate } from 'app/utils/RootNavigation';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: ENV.GOOGLE_CLIENT_ID,
  iosClientId: ENV.GOOGLE_CLIENT_ID_IOS,
  offlineAccess: true,
});

const Socials = () => {
  useInjectSaga({ key: injectionKeys.signInViaSocials, saga, mode: DAEMON });
  const dispatch = useDispatch();
  const openedByLink = useSelector(selectOpenedByLink);

  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      dispatch(
        signInViaSocial({
          provider: 'google',
          token: response?.serverAuthCode,
          invite: openedByLink?.courseToken,
          sessionId: openedByLink?.sessionId,
        }),
      ).then((payload) => {
        setLoading(false);
        navigate('SignUpSocialPage', { payload });
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.icon}
        onPress={loading ? () => {} : signIn}>
        {loading ? <Spinner color="#3A87E0" /> : <GoogleIcon />}
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.icon}>
        <VkIcon />
      </TouchableOpacity> */}
    </View>
  );
};

export default Socials;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#DFE1E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
