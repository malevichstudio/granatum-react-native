import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Backdrop } from 'react-native-backdrop';

import CameraIcon from 'app/components/icons/CameraIcon';
import EditIcon from 'app/components/icons/EditIcon';
import LinkIcon from 'app/components/icons/LinkIcon';
import LogOutIcon from 'app/components/icons/LogOutIcon';
import LockIcon from 'app/components/icons/LockIcon';
import { injectionKeys, authProviders } from 'app/config';
import { useInjectSaga } from 'app/utils/injectSaga';
import colors from 'app/theme/variables/colors/defaultColors';
import saga from './sagas';
import { DAEMON } from 'app/utils/constants';
import ArrowRight from 'app/components/icons/ArrowRight';
import messages from './messages';
import { selectUser } from 'app/containers/App/selectors';
import AvatarUpload from './components/AvatarUpload';
import { signOut } from '../App/actions';
import Menu from '../AccountPage/components/Header/Menu';

const ProfilePage = () => {
  useInjectSaga({ key: injectionKeys.profile, saga, mode: DAEMON });
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogOut = () => {
    dispatch(signOut());
  };

  function handleOpen() {
    setModalVisible(true);
  }

  function handleClose() {
    setModalVisible(false);
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.profileInfo}>
        <View style={styles.profileTop}>
          <TouchableOpacity transparent onPress={handleOpen}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />
            <View style={styles.cameraIcon}>
              <CameraIcon color={colors.textDark} />
            </View>
          </TouchableOpacity>
          <Menu />
        </View>

        <TouchableOpacity
          style={styles.profileBottom}
          transparent
          onPress={() => navigation.navigate('ProfileInfo')}>
          <View>
            <Text variantH6>{user?.name}</Text>
            <Text variantBody2 gray>
              {user?.email}
            </Text>
          </View>
          <EditIcon color={colors.textLight} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileSocials')}
        style={styles.link}>
        <LinkIcon style={styles.linkIcon} fill={colors.textDark} />
        <Text variantBody1>
          <FormattedMessage {...messages.linkedAccounts} />
        </Text>
        <ArrowRight style={styles.icon} fill={colors.textLight} />
        <View style={styles.divider} />
      </TouchableOpacity>

      <TouchableOpacity
        disabled={user.status === 'AWAITING_CONFIRMATION'}
        onPress={() => navigation.navigate('ProfilePassword')}
        style={styles.link}>
        <LockIcon style={styles.linkIcon} fill={colors.textDark} />
        <Text variantBody1>
          <FormattedMessage
            {...messages[
              (user?.networks?.length &&
                !user.networks.includes(authProviders.password.apiSlug)) ||
              !user.passwordSet
                ? 'setPassword'
                : 'changePassword'
            ]}
          />
        </Text>
        <ArrowRight style={styles.icon} fill={colors.textLight} />
        <View style={styles.divider} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogOut} style={styles.link}>
        <LogOutIcon style={styles.linkIcon} fill={colors.textDark} />
        <Text variantBody1>
          <FormattedMessage {...messages.logout} />
        </Text>
      </TouchableOpacity>

      <Backdrop
        visible={modalVisible}
        closedHeight={0}
        handleOpen={handleOpen}
        handleClose={handleClose}
        swipeConfig={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
        animationConfig={{
          speed: 14,
          bounciness: 4,
        }}
        overlayColor="rgba(0,0,0,0.33)"
        containerStyle={styles.container}>
        <AvatarUpload />
      </Backdrop>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 33 : 1,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileTop: {
    height: 108,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingLeft: 16,
  },
  profileBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: -4,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 48,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { marginLeft: 'auto' },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  linkIcon: { marginRight: 16 },
  divider: {
    position: 'absolute',
    width: Dimensions.get('window').width - 32,
    height: 1,
    bottom: 1,
    left: 16,
    right: 0,
    backgroundColor: colors.textG2,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 96,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  iconButton: { height: 48, width: 48 },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
});

export default ProfilePage;
