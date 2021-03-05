import React, { useEffect, useMemo } from 'react';
import { useSelector, useStore, useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { registerGlobals } from 'react-native-webrtc';

import colors from 'app/theme/variables/colors/defaultColors';
import useInitBroadcasting from 'app/hooks/useInitBroadcasting';
import { swipeLine } from 'app/styles/buttons';
import { selectUser } from '../App/selectors';
import {
  selectSessionId,
  selectSessionRole,
  selectActiveSheetType,
  selectTeamId,
  selectIsVideoChatOpen,
  selectUserIsUnassigned,
} from '../SessionPage/selectors';
import { SESSION_CHAT_TYPE } from '../../constants';
import RoomContext from './RoomContext';
import Room from './components/Room';
import {
  VIDEO_CHAT_HEIGHT,
  CLOSED_VIDEO_CHAT_HEIGHT,
} from '../SessionPage/constants';

import BackdropTop from '../../components/BackdropTop';
import { setVideoPanelOpen } from '../SessionPage/actions';
import { selectPeers, selectPinned, selectSpeaker } from './selectors';

export default function FreeBroadcasting() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const sessionId = useSelector(selectSessionId);
  const role = useSelector(selectSessionRole);
  const sheetType = useSelector(selectActiveSheetType);
  const teamId = useSelector(selectTeamId) || null;
  const isVideoChatOpen = useSelector(selectIsVideoChatOpen);
  const speakerPeer = useSelector(selectSpeaker);
  const sessionPeers = useSelector(selectPeers);
  const pinnedPeers = useSelector(selectPinned);
  const userIsUnassigned = useSelector(selectUserIsUnassigned);
  const speaker = speakerPeer?.id ? { [speakerPeer.id]: speakerPeer } : {};
  // Id пира который вещает на все комнаты, но при этом на другом листе
  const isNotHearId = useMemo(() => {
    const peers = { ...sessionPeers, ...pinnedPeers };
    const peersArray = Object.values(peers);

    if (speaker) {
      peersArray.push(speaker);
    }

    const broadcaster = peersArray?.find(
      ({ settings }) => settings?.broadcastToAll,
    );

    if (broadcaster) {
      return broadcaster.settings.teamId !== teamId ? broadcaster.id : null;
    }

    return false;
  }, [sessionPeers, speaker, pinnedPeers, sheetType, teamId]);
  const store = useStore();

  const [room, roomRef] = useInitBroadcasting(
    SESSION_CHAT_TYPE,
    sheetType,
    sessionId,
    teamId,
    user,
    role,
    store,
  );

  useEffect(() => {
    registerGlobals();
  }, []);

  // не все данные сессии ещё подгрузились. Ждём.
  if (typeof role !== 'string') {
    return null;
  }

  const handleOpen = () => {
    dispatch(setVideoPanelOpen(true));
  };

  const handleClose = () => {
    dispatch(setVideoPanelOpen(false));
  };

  return (
    <BackdropTop
      visible={isVideoChatOpen}
      closedHeight={
        isNotHearId ? CLOSED_VIDEO_CHAT_HEIGHT + 50 : CLOSED_VIDEO_CHAT_HEIGHT
      }
      handleOpen={handleOpen}
      handleClose={handleClose}
      onClose={() => {}}
      swipeConfig={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
      }}
      animationConfig={{
        speed: 14,
        bounciness: 4,
      }}
      overlayColor="rgba(0,0,0,0)"
      containerStyle={styles.container}>
      <View style={styles.content}>
        <RoomContext.Provider
          value={{
            roomClient: roomRef.current,
          }}>
          <Room
            connected={room?.state === 'connected'}
            isNotHearId={isNotHearId}
            isVideoChatOpen={isVideoChatOpen}
            sheetType={sheetType}
            userIsUnassigned={userIsUnassigned}
          />
        </RoomContext.Provider>
        <View style={styles.header}>
          <View style={swipeLine(colors.textGray)} />
        </View>
      </View>
    </BackdropTop>
  );

  // return (
  //   <View>
  //     <Spinner color={colors.primary} />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  header: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  container: {
    backgroundColor: colors.textDark,
  },
  content: {
    paddingHorizontal: 16,
    height: VIDEO_CHAT_HEIGHT,
  },
});
