import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { MediaStream, RTCView } from 'react-native-webrtc';

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
import {
  selectConsumers,
  selectPeers,
  selectPinned,
  selectSpeaker,
} from '../selectors';

function SpeakingPeer({ isVideoChatOpen, sheetType, peerId = null }) {
  const [videoStream, setVideoStream] = useState({ toURL: () => {} });
  const sessionPeers = useSelector(selectPeers);
  const pinnedPeers = useSelector(selectPinned);
  const peersArray = Object.values({ ...sessionPeers, ...pinnedPeers });
  const speaker = useSelector(selectSpeaker);
  const consumers = useSelector(selectConsumers);

  if (speaker && sheetType !== SHEET_TYPE_COMMON) {
    peersArray.push(speaker);
  }

  const peer = useMemo(
    () =>
      peersArray?.length && peerId
        ? peersArray.find((item) => item.id === peerId)
        : null,
    [peerId, peersArray],
  );

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
  const { settings } = peer;
  const avaSize = !isVideoChatOpen ? 44 : 80;
  return (
    <View
      style={[isVideoChatOpen ? peerWrapper(colors.vk) : peerWrapperClosed]}>
      <View
        style={[
          isVideoChatOpen ? peerContent(colors.textD1) : peerContentClosed,
          settings.broadcastToAll && styles.broadcastToAll,
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
              size={!settings.broadcastToAll ? avaSize : avaSize - 2}
              borderRadius={!isVideoChatOpen ? 4 : 50}
              avatar={settings.avatar}
              name={peer.displayName}
              color={settings.color}
            />
          </View>
        )}

        {isVideoChatOpen && (
          <View style={peerNameWrapper}>
            <Text
              variantBody1
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ color: colors.white }}>
              {peer.displayName}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

SpeakingPeer.propTypes = {
  sheetType: PropTypes.oneOf([
    SHEET_TYPE_COMMON,
    SHEET_TYPE_PERSONAL,
    SHEET_TYPE_TEAM,
  ]),
};

export default SpeakingPeer;

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
  broadcastToAll: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.error,
  },
});
