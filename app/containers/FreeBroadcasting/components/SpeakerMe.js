import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Text } from 'native-base';
import { RTCView, MediaStream } from 'react-native-webrtc';
import { View, StyleSheet } from 'react-native';

import colors from 'app/theme/variables/colors/defaultColors';
import SpeakerIcon from 'app/components/icons/SpeakerIcon';
import {
  peerContent,
  peerContentClosed,
  peerNameWrapper,
  peerWrapper,
  peerWrapperClosed,
} from 'app/styles/peers';
import {
  selectDisableBroadcastCam,
  selectActiveSheetType,
  makeSelectIsMeSpeaker,
} from '../../SessionPage/selectors';
import { selectUser, selectUserId } from '../../App/selectors';
import { getCamState } from '../../../utils/mediasoup/helpers';
import {
  SESSION_CHAT_TYPE,
  TEAM_CHAT_TYPE,
  SHEET_TYPE_COMMON,
  SHEET_TYPE_PERSONAL,
  SHEET_TYPE_TEAM,
} from '../../../constants';
import { withRoomContext } from '../RoomContext';
import { selectCanSendWebcam, selectProducers } from '../selectors';
import Avatar from '../../../components/Avatar';

const SpeakerMe = ({ roomClient = {}, isVideoChatOpen }) => {
  const [videoStream, setVideoStream] = useState({ toURL: () => {} });

  const disableBroadcastCam = useSelector(selectDisableBroadcastCam);
  const { color, name, avatar } = useSelector(selectUser);
  const sheetType = useSelector(selectActiveSheetType);
  const userId = useSelector(selectUserId);
  const selectIsMeSpeaker = useMemo(() => makeSelectIsMeSpeaker(userId), [
    userId,
  ]);
  const isMeSpeaker = useSelector(selectIsMeSpeaker);
  // На случай, если страница, на которой находится пользователь будет удалена
  // COMMON -- это просто fallback-значение без какой-то особой логики под этим
  const activeSheetType = sheetType?.type || SHEET_TYPE_COMMON;
  const isCommonSheet = activeSheetType === SHEET_TYPE_COMMON;
  const isDisableBroadcastCam = isCommonSheet && disableBroadcastCam;

  const canSendWebcam = useSelector(selectCanSendWebcam);
  const producers = useSelector(selectProducers);

  const producersArray = Object.values(producers);
  const videoProducer = producersArray.find(
    (producer) => producer.track.kind === 'video' && producer.type !== 'share',
  );

  const videoVisible = videoProducer
    ? !(
        videoProducer.locallyPaused ||
        videoProducer.remotelyPaused ||
        videoProducer.paused
      )
    : false;

  const isCamAllowed = !isDisableBroadcastCam;
  const camState = useMemo(
    () => getCamState(videoProducer, canSendWebcam, isCamAllowed),
    [videoProducer, canSendWebcam, isCamAllowed],
  );

  // кейс https://granatum.atlassian.net/browse/TASK-4179
  useEffect(() => {
    if (!isCamAllowed && camState === 'on' && !isMeSpeaker) {
      roomClient.disableWebcam();
    }
  }, [isCamAllowed, camState]);

  const addVideoTrack = () => {
    if (videoProducer) {
      const stream = new MediaStream();
      stream.addTrack(videoProducer.track);
      setVideoStream(stream);
    } else {
      setVideoStream({ toURL: () => {} });
    }
  };

  useEffect(() => {
    addVideoTrack();
  }, [videoProducer]);

  return (
    <View style={isVideoChatOpen ? peerWrapper(colors.vk) : peerWrapperClosed}>
      <View
        style={[
          isVideoChatOpen ? peerContent(colors.textD1) : peerContentClosed,
        ]}>
        {videoVisible ? (
          <RTCView
            streamURL={videoStream.toURL()}
            objectFit={'cover'}
            style={styles.rtc}
          />
        ) : (
          <View style={styles.emptyAvatar}>
            <Avatar
              size={!isVideoChatOpen ? 44 : 80}
              borderRadius={!isVideoChatOpen ? 4 : 50}
              avatar={avatar}
              name={name}
              color={color}
            />
          </View>
        )}

        {isVideoChatOpen && (
          <View style={peerNameWrapper}>
            <SpeakerIcon color={colors.white} />
            <Text
              variantBody1
              style={styles.peerName}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {name}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

SpeakerMe.propTypes = {
  roomClient: PropTypes.object,
  type: PropTypes.oneOf([SESSION_CHAT_TYPE, TEAM_CHAT_TYPE]),
  sheetType: PropTypes.oneOf([
    SHEET_TYPE_COMMON,
    SHEET_TYPE_PERSONAL,
    SHEET_TYPE_TEAM,
  ]).isRequired,
};

export default withRoomContext(SpeakerMe);

const styles = StyleSheet.create({
  emptyAvatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rtc: {
    width: '100%',
    flex: 1,
  },
  peerName: {
    paddingLeft: 8,
    color: colors.white,
  },
});
