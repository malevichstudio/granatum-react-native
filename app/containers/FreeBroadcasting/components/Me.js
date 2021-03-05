import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button } from 'native-base';
import { View, StyleSheet, AppState } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import RNSwitchAudioOutput from 'react-native-switch-audio-output';
import HeadphoneDetection from 'react-native-headphone-detection';

import colors from 'app/theme/variables/colors/defaultColors';
import MicIcon from 'app/components/icons/MicIcon';
import MicOffIcon from 'app/components/icons/MicOffIcon';
import VideoIcon from 'app/components/icons/VideoIcon';
import VideoOffIcon from 'app/components/icons/VideoOffIcon';
import SpeakerOnIcon from 'app/components/icons/SpeakerOnIcon';
import SpeakerOffIcon from 'app/components/icons/SpeakerOffIcon';

import {
  selectDisableBroadcastMic,
  selectDisableBroadcastCam,
  selectActiveSheetType,
  makeSelectIsMeSpeaker,
  makeSelectIsMePinned,
} from '../../SessionPage/selectors';
import { selectUserId } from '../../App/selectors';
import { getMicState, getCamState } from '../../../utils/mediasoup/helpers';
import { SHEET_TYPE_COMMON } from '../../../constants';
import { withRoomContext } from '../RoomContext';
import {
  selectCanSendMic,
  selectCanSendWebcam,
  selectWebcamInProgress,
  selectProducers,
  selectConsumers,
} from '../selectors';

const Me = ({ roomClient = {}, isVideoChatOpen }) => {
  const [micLoading, setMicLoading] = useState(false);
  const [audioOutput, setAudioOutput] = useState(null);
  const headphones = useRef(false);
  const speakerState = useRef(false);
  const disableBroadcastMic = useSelector(selectDisableBroadcastMic);
  const disableBroadcastCam = useSelector(selectDisableBroadcastCam);
  const consumers = useSelector(selectConsumers);
  const consumersArray = Object.values(consumers);
  const sheetType = useSelector(selectActiveSheetType);
  // На случай, если страница, на которой находится пользователь будет удалена
  // COMMON -- это просто fallback-значение без какой-то особой логики под этим
  const activeSheetType = sheetType?.type || SHEET_TYPE_COMMON;
  const isCommonSheet = activeSheetType === SHEET_TYPE_COMMON;
  const isDisableBroadcastCam = isCommonSheet && disableBroadcastCam;
  const isDisableBroadcastMic = isCommonSheet && disableBroadcastMic;
  const userId = useSelector(selectUserId);
  const selectIsMePinned = useMemo(() => makeSelectIsMePinned(userId), [
    userId,
  ]);
  const isMePinned = useSelector(selectIsMePinned);
  const selectIsMeSpeaker = useMemo(() => makeSelectIsMeSpeaker(userId), [
    userId,
  ]);
  const isMeSpeaker = useSelector(selectIsMeSpeaker);

  const canSendMic = useSelector(selectCanSendMic);
  const canSendWebcam = useSelector(selectCanSendWebcam);
  const webcamInProgress = useSelector(selectWebcamInProgress);
  const producers = useSelector(selectProducers);

  const producersArray = Object.values(producers);
  const audioProducer = producersArray.find(
    (producer) => producer.track.kind === 'audio',
  );
  const videoProducer = producersArray.find(
    (producer) => producer.track.kind === 'video' && producer.type !== 'share',
  );

  const isCamAllowed = isMeSpeaker || isMePinned || !isDisableBroadcastCam;
  const isMicAllowed = isMeSpeaker || isMePinned || !isDisableBroadcastMic;

  const micState = useMemo(
    () => getMicState(audioProducer, canSendMic, isMicAllowed),
    [audioProducer, canSendMic, isMicAllowed],
  );
  const camState = useMemo(
    () => getCamState(videoProducer, canSendWebcam, isCamAllowed),
    [videoProducer, canSendWebcam, isCamAllowed],
  );

  // кейс https://granatum.atlassian.net/browse/TASK-4179
  useEffect(() => {
    if (!isCamAllowed && camState === 'on') {
      roomClient.disableWebcam();
    }
  }, [isCamAllowed, camState]);

  useEffect(() => {
    if (!isMicAllowed && micState === 'on') {
      roomClient.disableMic().finally(toggleMicDone);
    }
  }, [isMicAllowed, micState]);

  function toggleMicDone() {
    setMicLoading(false);
  }

  function handleMicClick() {
    setMicLoading(true);
    if (roomClient) {
      switch (micState) {
        case 'on':
          roomClient.disableMic().finally(toggleMicDone);
          break;
        case 'off':
          roomClient.enableMic().finally(toggleMicDone);
          break;
        case 'unsupported':
          roomClient
            .startProducing()
            .then(() => roomClient.enableMic())
            .finally(toggleMicDone);
          break;
        case 'denied':
        default:
          // На всякий случай выключаем (может быть включено было...)
          roomClient.disableMic().finally(toggleMicDone);
          break;
      }
    }
  }

  function handleCamClick() {
    if (roomClient) {
      switch (camState) {
        case 'on':
          roomClient.disableWebcam();
          break;
        case 'off':
          roomClient.enableWebcam();
          break;
        case 'unsupported':
          roomClient.startProducing().then(() => roomClient.enableWebcam());
          break;
        case 'denied':
        default:
          // На всякий случай выключаем (может быть включено было...)
          roomClient.disableWebcam();
      }
    }
  }

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState.match(/inactive|background/)) {
      roomClient.disableWebcam();
    }
  };

  useFocusEffect(
    useCallback(() => {
      AppState.addEventListener('change', handleAppStateChange);
      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    }, []),
  );

  const changeAudioOutputState = () => {
    setAudioOutput((prevState) => {
      if (prevState !== 'on') {
        return 'on';
      } else {
        return 'off';
      }
    });
  };

  useEffect(() => {
    if (audioOutput === 'off') {
      RNSwitchAudioOutput.switchAudioOutput(false);
      speakerState.current = false;
    }
    if (audioOutput === 'on') {
      RNSwitchAudioOutput.switchAudioOutput(true);
    }
  }, [audioOutput]);

  useEffect(() => {
    let didCancel = false;
    HeadphoneDetection.isAudioDeviceConnected().then((connected) => {
      if (!connected.audioJack && !connected.bluetooth) {
        if (!didCancel) {
          setAudioOutput('on');
        }
      }
    });

    HeadphoneDetection.addListener((connected) => {
      if (connected.audioJack || connected.bluetooth) {
        setAudioOutput('off');
        headphones.current = true;
      } else if (headphones.current) {
        setAudioOutput('on');
        headphones.current = false;
      }
    });

    return () => {
      didCancel = true;
    };
  }, []);

  // Спикер включается только если есть аудио трэки (IOS)
  // по этому при входе на доску мы должны дождаться когда появится консюмер и только тогда включать спикер.

  // Второй кейс это когда все выключили микрофоны, спикер выключится автоматически,
  // мы должны фиксировать это, что бы когда появится консюмер врубить спикера опять.

  // У других библиотек включения спикера, на IOS такая же проблема

  useEffect(() => {
    if (!consumersArray.length) {
      speakerState.current = false;
      return;
    }

    if (audioOutput === 'on' && !speakerState.current) {
      const audioConsumer = consumersArray.find(
        (consumer) => consumer.codec === 'opus',
      );
      if (audioConsumer) {
        RNSwitchAudioOutput.switchAudioOutput(true);
        speakerState.current = true;
      } else {
        speakerState.current = false;
      }
    }
  }, [consumersArray.length]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={[
            styles.iconButtonOn,
            micState !== 'on' && styles.iconButtonOff,
          ]}
          transparent
          disabled={!isMicAllowed || micLoading}
          onPress={handleMicClick}>
          {micState !== 'on' ? (
            <MicOffIcon color={colors.white} />
          ) : (
            <MicIcon color={colors.white} />
          )}
        </Button>
        <Button
          style={[
            styles.iconButtonOn,
            camState !== 'on' && styles.iconButtonOff,
          ]}
          transparent
          disabled={!isCamAllowed || webcamInProgress}
          onPress={handleCamClick}>
          {camState !== 'on' ? (
            <VideoOffIcon color={colors.white} />
          ) : (
            <VideoIcon color={colors.white} />
          )}
        </Button>
        {isVideoChatOpen && (
          <Button
            style={[
              styles.iconButtonOn,
              audioOutput !== 'on' && styles.iconButtonOff,
            ]}
            transparent
            disabled={micLoading}
            onPress={changeAudioOutputState}>
            {audioOutput !== 'on' ? (
              <SpeakerOffIcon color={colors.white} />
            ) : (
              <SpeakerOnIcon color={colors.white} />
            )}
          </Button>
        )}
      </View>
    </View>
  );
};

Me.propTypes = {
  roomClient: PropTypes.object,
};

export default withRoomContext(Me);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    zIndex: 1000,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconButtonOn: {
    borderWidth: 1,
    borderColor: colors.white,
    height: 43,
    width: 43,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  iconButtonOff: {
    borderColor: colors.error,
    backgroundColor: colors.error,
  },
});
