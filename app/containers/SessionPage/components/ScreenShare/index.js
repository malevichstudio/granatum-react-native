import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MediaStream, RTCView } from 'react-native-webrtc';
import { StyleSheet, View } from 'react-native';
import { selectIsVideoChatOpen } from '../../selectors';
import { CLOSED_VIDEO_CHAT_HEIGHT, VIDEO_CHAT_HEIGHT } from '../../constants';

function ScreenShare({ shareConsumer }) {
  const isVideoChatOpen = useSelector(selectIsVideoChatOpen);
  const [shareStream, setShareStream] = useState({ toURL: () => {} });

  const addShareTrack = () => {
    if (shareConsumer) {
      const stream = new MediaStream();
      stream.addTrack(shareConsumer.track);
      setShareStream(stream);
    } else {
      setShareStream({ toURL: () => {} });
    }
  };

  useEffect(() => {
    addShareTrack();
  }, [shareConsumer]);

  return (
    <View
      style={[
        styles.content,
        {
          paddingTop: isVideoChatOpen
            ? VIDEO_CHAT_HEIGHT
            : CLOSED_VIDEO_CHAT_HEIGHT,
        },
      ]}>
      <RTCView
        streamURL={shareStream.toURL()}
        objectFit={'contain'}
        style={styles.rtc}
      />
    </View>
  );
}

ScreenShare.propTypes = {};

export default ScreenShare;

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#ececec',
    width: '100%',
    flex: 1,
  },
  rtc: {
    width: '100%',
    height: '100%',
  },
});
