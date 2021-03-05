import React, { useState, memo, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Spinner } from 'native-base';
import BackgroundTimer from 'react-native-background-timer';
import {
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { FormattedMessage, useIntl } from 'react-intl';
import placeholderImage from 'app/components/images/YoutubePlaceholder.png';
import { addNotification } from 'app/containers/App/actions';
import colors from 'app/theme/variables/colors/defaultColors';
import messages from '../../../messages';
import { makeSelectYoutubeWidget } from '../../../selectors';

const Youtube = ({ id }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const selectYoutubeWidget = useMemo(() => makeSelectYoutubeWidget(id), [id]);
  const widget = useSelector(selectYoutubeWidget);
  const [isReady, setIsReady] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const videoId = parseYoutubeUrl(widget?.url);

  const handlePress = useCallback(async () => {
    if (isPressed) {
      return null;
    }
    setIsPressed(true);

    const supported = await Linking.canOpenURL(widget?.url);

    if (supported) {
      dispatch(
        addNotification({
          message: { ...messages?.youTubeVideoSoundWarning },
          type: 'widget',
          buttonText: intl.formatMessage(messages.follow),
          duration: 10000,
          onButtonClick: async () => {
            await Linking.openURL(widget?.url);
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
  }, [widget?.url, isPressed]);

  if (!videoId || !widget?.url) {
    return <Placeholder />;
  }

  if (!isYouTubeUrlValid(widget?.url)) {
    return (
      <View style={styles.placeholder}>
        <Text semiBold style={styles.placeholderText}>
          <FormattedMessage {...messages.videoLinkIsInvalid} />
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.wrapper} pointerEvents={'none'}>
        {!isReady && <Spinner color="blue" />}
        <View style={{ display: isReady ? 'flex' : 'none' }}>
          <YoutubePlayer
            height="100%"
            videoId={videoId}
            onReady={() => setIsReady(true)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Youtube);

const Placeholder = () => {
  return (
    <View style={styles.placeholder}>
      <Image style={styles.placeholderImage} source={placeholderImage} />
      <Text semiBold style={styles.placeholderText}>
        <FormattedMessage {...messages.YouTubeVideoIsMissing} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mainL7,
    height: '100%',
    overflow: 'hidden',
  },
  placeholderImage: {
    width: 160,
    height: 160,
  },
  placeholderText: {
    backgroundColor: '#EEEFF1',
    margin: 0,
    padding: 0,
    position: 'relative',
    top: -10,
  },
});

function parseYoutubeUrl(url) {
  if (url) {
    let id = url?.split('v=')[1];
    const extra = id?.indexOf('&');

    if (extra !== -1) {
      id = id?.substring(0, extra);
    }
    return id;
  }

  return null;
}

function isYouTubeUrlValid(url) {
  if (!url.includes('youtube.com/watch?v=') || !parseYoutubeUrl(url)) {
    return false;
  }

  if (url != undefined || url != '') {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      return true;
    } else {
      return false;
    }
  }
}
