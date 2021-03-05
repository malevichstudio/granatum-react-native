import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { MediaStream, RTCView } from 'react-native-webrtc';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import SpeakerIcon from 'app/components/icons/SpeakerIcon';
import Avatar from 'app/components/Avatar';
import colors from 'app/theme/variables/colors/defaultColors';
import {
  peerWrapper,
  peerWrapperClosed,
  peerContent,
  peerContentClosed,
  peerNameWrapper,
} from 'app/styles/peers';
import {
  SHEET_TYPE_COMMON,
  SHEET_TYPE_PERSONAL,
  SHEET_TYPE_TEAM,
} from '../../../constants';
import { selectConsumers, selectSpeaker } from '../selectors';

function SpeakerPeer({ isVideoChatOpen, ...props }) {
  const [videoStream, setVideoStream] = useState({ toURL: () => {} });
  const peer = useSelector(selectSpeaker);
  const consumers = useSelector(selectConsumers);

  const consumersArray = useMemo(
    () =>
      peer ? peer.consumers.map((consumerId) => consumers[consumerId]) : [],
    [peer?.consumers, consumers],
  );
  const videoConsumer = useMemo(
    () =>
      consumersArray.find(
        (consumer) => consumer.track.kind === 'video' && !consumer.share,
      ),
    [consumersArray],
  );
  const videoVisible = videoConsumer
    ? !(videoConsumer.locallyPaused || videoConsumer.remotelyPaused)
    : false;

  const addVideoTrack = () => {
    if (videoConsumer) {
      const stream = new MediaStream();
      stream.addTrack(videoConsumer.track);
      setVideoStream(stream);
    } else {
      setVideoStream({ toURL: () => {} });
    }
  };

  useEffect(() => {
    addVideoTrack();
  }, [videoConsumer]);

  if (!peer || !peer.settings) {
    return null;
  }

  return (
    <View style={isVideoChatOpen ? peerWrapper(colors.vk) : peerWrapperClosed}>
      <View
        style={[
          props.styles,
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
              avatar={peer.settings.avatar}
              name={peer.displayName}
              color={peer.settings.color}
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
              {peer.displayName}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

SpeakerPeer.propTypes = {
  sheetType: PropTypes.oneOf([
    SHEET_TYPE_COMMON,
    SHEET_TYPE_PERSONAL,
    SHEET_TYPE_TEAM,
  ]),
};

export default SpeakerPeer;

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
