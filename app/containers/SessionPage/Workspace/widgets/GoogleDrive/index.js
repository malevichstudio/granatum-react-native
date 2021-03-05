import React, { memo, useCallback, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Image,
  Linking,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { Text } from 'native-base';
import { FormattedMessage, useIntl } from 'react-intl';
import GoogleDocumentIcon from 'app/components/icons/GoogleDocumentIcon';
import GooglePresentationIcon from 'app/components/icons/GooglePresentationIcon';
import GoogleSpreadsheetIcon from 'app/components/icons/GoogleSpreadsheetIcon';
import theme from 'app/theme/variables/defaultTheme';
import { addNotification } from 'app/containers/App/actions';
import placeholderImage from 'app/components/images/GoogleDriveWidgetPlaceholder.png';
import messages from '../../../messages';
import { makeSelectGoogleDriveWidget } from '../../../selectors';
import BackgroundTimer from 'react-native-background-timer';

const GoogleDrive = ({ id }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const selectGoogleDriveWidget = useMemo(
    () => makeSelectGoogleDriveWidget(id),
    [id],
  );
  const widget = useSelector(selectGoogleDriveWidget);
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = useCallback(async () => {
    if (isPressed) {
      return null;
    }
    setIsPressed(true);

    const supported = await Linking.canOpenURL(widget?.filePath);

    if (supported) {
      dispatch(
        addNotification({
          message: { ...messages.googleSoundWarning },
          type: 'widget',
          buttonText: intl.formatMessage(messages.follow),
          duration: 10000,
          onButtonClick: async () => {
            await Linking.openURL(widget?.filePath);
            setIsPressed(false);
          },
        }),
      );
      if (Platform.OS === 'ios') {
        BackgroundTimer.start();
      }
      BackgroundTimer.setTimeout(() => {
        setIsPressed(false);
      }, 10000);
      if (Platform.OS === 'ios') {
        BackgroundTimer.stop();
      }
    } else {
      dispatch(
        addNotification({
          message: { ...messages?.invalidLink },
          type: 'error',
        }),
      );
      setIsPressed(false);
    }
  }, [widget?.filePath, isPressed]);

  const getFileType = () => {
    if (widget?.filePath.includes('document')) {
      return 'document';
    }
    if (widget?.filePath.includes('spreadsheets')) {
      return 'spreadsheets';
    }
    if (widget?.filePath.includes('presentation')) {
      return 'presentation';
    }
    return 'document';
  };

  const renderIcon = () => {
    switch (getFileType()) {
      case 'document':
        return <GoogleDocumentIcon />;
      case 'spreadsheets':
        return <GoogleSpreadsheetIcon />;
      case 'presentation':
        return <GooglePresentationIcon />;
    }
  };

  if (!widget?.filePath) {
    return <Placeholder />;
  }

  return (
    <TouchableHighlight style={{ height: '100%' }} onPress={handlePress}>
      <View style={[styles.wrapper, styles[getFileType()]]}>
        {renderIcon()}
        <Text variantSubtitle2 style={styles.name}>
          {widget?.fileName}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default memo(GoogleDrive);

const Placeholder = () => {
  return (
    <View style={styles.placeholder}>
      <Image source={placeholderImage} style={styles.placeholderImage} />
      <Text semiBold style={styles.placeholderText}>
        <FormattedMessage {...messages.GoogleDriveNotUploaded} />
      </Text>
      <Text style={styles.placeholderDesc}>
        <FormattedMessage {...messages.GoogleDriveNotUploadedDescr} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dce9fd',
    paddingHorizontal: 10,
  },
  document: {
    backgroundColor: '#dce9fd',
  },
  spreadsheets: {
    backgroundColor: '#d3ede0',
  },
  presentation: {
    backgroundColor: '#fdf1d0',
  },
  placeholderImage: {
    width: 55,
    height: 55,
  },
  name: {
    textAlign: 'center',
    marginTop: 10,
  },
  placeholder: {
    alignItems: 'center',
    backgroundColor: theme?.colors.mainL7,
    paddingBottom: 15,
  },
  placeholderDesc: {
    textAlign: 'center',
    opacity: 0.8,
    fontSize: 14,
    marginTop: 5,
  },
});
