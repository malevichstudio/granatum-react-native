import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RTCView, MediaStream } from 'react-native-webrtc';
import { View, StyleSheet } from 'react-native';

import colors from 'app/theme/variables/colors/defaultColors';
import { selectUserId } from '../../App/selectors';
import { makeSelectIsMeSpeaker } from '../../SessionPage/selectors';
import { selectUser } from '../../App/selectors';
import { selectProducers } from '../selectors';
import Avatar from '../../../components/Avatar';
import { SHEET_TYPE_COMMON } from '../../../constants';

const MeVideo = ({ sheetType }) => {
  const [videoStream, setVideoStream] = useState({ toURL: () => {} });
  const userId = useSelector(selectUserId);
  const { color, name, avatar } = useSelector(selectUser);

  const producers = useSelector(selectProducers);

  const selectIsMeSpeaker = useMemo(() => makeSelectIsMeSpeaker(userId), [
    userId,
  ]);
  const isMeSpeaker = useSelector(selectIsMeSpeaker);

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
    <View style={styles.container}>
      {(!isMeSpeaker || sheetType !== SHEET_TYPE_COMMON) && (
        <View style={styles.videoWrap}>
          {videoVisible ? (
            <RTCView
              streamURL={videoStream.toURL()}
              objectFit={'cover'}
              style={styles.rtc}
            />
          ) : (
            <Avatar
              size={40}
              name={name}
              borderRadius={4}
              color={color}
              avatar={avatar}
            />
          )}
        </View>
      )}
    </View>
  );
};

MeVideo.propTypes = {};

export default MeVideo;

const styles = StyleSheet.create({
  container: {},
  rtc: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  emptyAvatar: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoWrap: {
    height: 40,
    width: 40,
  },
});
