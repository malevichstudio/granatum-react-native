import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import PictureIcon from 'app/components/icons/PictureIcon';
import DeleteIcon from 'app/components/icons/DeleteIcon';
import { updateAvatar } from '../actions';
import messages from '../messages';
import { selectUser } from 'app/containers/App/selectors';
import colors from 'app/theme/variables/colors/defaultColors';

const AvatarUpload = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    if (avatar?.uri) {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', {
        uri:
          Platform.OS === 'android'
            ? avatar.uri
            : avatar.uri.replace('file://', ''),
        name: avatar?.fileName || 'avatar.jpg',
        type: avatar?.type,
      });

      dispatch(updateAvatar(formData)).then(handleLoading).catch(handleLoading);
    }
  }, [avatar?.uri]);

  function handleLoading() {
    setLoading(false);
  }

  function handleDelete() {
    dispatch(
      updateAvatar({
        avatar: null,
      }),
    );
    setAvatar(null);
  }

  const options = {
    title: intl.formatMessage(messages.profilePicture),
    takePhotoButtonTitle: intl.formatMessage(messages.takePhoto),
    chooseFromLibraryButtonTitle: intl.formatMessage(
      messages.chooseFromLibrary,
    ),
    cancelButtonTitle: intl.formatMessage(messages.cancel),
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const handleChooseImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: response.uri,
          fileName: response?.fileName,
          type: response?.type,
        };
        setAvatar(source);
      }
    });
  };

  const showAvatarPreview = user?.avatar || avatar?.uri;

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLine} />
      </View>

      <TouchableOpacity
        loading={loading}
        onPress={handleChooseImage}
        style={styles.button}>
        <PictureIcon style={styles.buttonIcon} color={colors.textDark} />
        <Text variantBody1>
          {user.avatar ? (
            <FormattedMessage {...messages.changeAvatar} />
          ) : (
            <FormattedMessage {...messages.uploadAvatar} />
          )}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDelete}
        disabled={!showAvatarPreview}
        style={styles.button}>
        <DeleteIcon style={styles.buttonIcon} fill={colors.textDark} />
        <Text variantBody1>
          <FormattedMessage {...messages.deleteAvatar} />
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default AvatarUpload;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
  },
  header: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLine: {
    width: 32,
    height: 4,
    backgroundColor: '#F2F2F3',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonIcon: { marginRight: 16 },
});
