import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import { useSelector, useDispatch } from 'react-redux';
import memoize from 'memoize-state';
import { selectShareConsumer } from '../FreeBroadcasting/selectors';
import Workspace from './Workspace';
import SheetsPagination from './SheetsPagination';
import MoveRemoveStiker from './MoveRemoveStiker';
import FreeBroadcasting from '../FreeBroadcasting';
import ScreenShare from './components/ScreenShare';
import ChatModal from './components/ChatModal';
import SessionStartTimer from './components/SessionStartTimer';
import {
  selectSessionId,
  selectActiveSheetId,
  selectIsPeersOpen,
} from 'app/containers/SessionPage/selectors';
import { getChats, leaveChat } from '../Chat/actions';
import { useInjectSaga } from 'app/utils/injectSaga';
import { useInjectReducer } from 'app/utils/injectReducer';
import { injectionKeys } from 'app/config';
import saga from '../Chat/sagas';
import reducer from '../Chat/reducers';
import { DAEMON } from 'app/utils/constants';
import { COURSE_TYPE_SYNCHRONOUS } from 'app/constants';
import { isSessionAdmin } from 'app/utils/permissions';
import {
  selectCourseType,
  selectSessionTimeToStart,
  selectSessionFinished,
  selectSessionStarted,
  selectSessionRole,
  selectUserIsUnassigned,
} from './selectors';
import {
  selectPeers,
  selectPinned,
  selectSpeaker,
} from '../FreeBroadcasting/selectors';
import { peersToggle } from 'app/containers/SessionPage/actions';
import PeersList from './Peers/PeersList';

const Session = ({}) => {
  useInjectSaga({ key: injectionKeys.chats, saga, mode: DAEMON });
  useInjectReducer({
    key: injectionKeys.chats,
    reducer,
  });

  const dispatch = useDispatch();
  const shareConsumer = useSelector(
    memoize((state) => selectShareConsumer(state)),
  );
  const sessionId = useSelector(selectSessionId);
  const sheetId = useSelector(selectActiveSheetId);
  const courseType = useSelector(selectCourseType);
  const timeToStart = useSelector(selectSessionTimeToStart);
  const finished = useSelector(selectSessionFinished);
  const started = useSelector(selectSessionStarted);
  const role = useSelector(selectSessionRole);
  const userIsUnassigned = useSelector(selectUserIsUnassigned);

  const isPeersOpen = useSelector(selectIsPeersOpen);
  const speakerPeer = useSelector(selectSpeaker);
  const sessionPeers = useSelector(selectPeers);
  const pinnedPeers = useSelector(selectPinned);
  const speaker = speakerPeer?.id ? { [speakerPeer.id]: speakerPeer } : {};
  const peersArray = Object.values({
    ...sessionPeers,
    ...pinnedPeers,
    ...speaker,
  });

  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    if (sessionId && sheetId) {
      dispatch(getChats({ sessionId, sheetId }));
    }
  }, [sessionId, sheetId]);

  useEffect(() => {
    if (sessionId && openChat) {
      setOpenChat(false);
    }
  }, [sessionId]);

  useEffect(() => () => dispatch(leaveChat()), []);

  if (
    courseType === COURSE_TYPE_SYNCHRONOUS &&
    timeToStart &&
    !finished &&
    !started &&
    !isSessionAdmin(role)
  ) {
    return <SessionStartTimer timeToStart={timeToStart} />;
  }

  return (
    <>
      <View style={styles.content}>
        <FreeBroadcasting />
        {!shareConsumer && !userIsUnassigned ? (
          <Workspace />
        ) : (
          <ScreenShare shareConsumer={shareConsumer} />
        )}
        <SheetsPagination handleOpenChat={() => setOpenChat(true)} />
        <PeersList
          peers={peersArray}
          visible={isPeersOpen}
          handleClose={() => dispatch(peersToggle())}
        />
        <MoveRemoveStiker />
        <KeepAwake />
      </View>
      {openChat && <ChatModal handleCloseChat={() => setOpenChat(false)} />}
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    height: '100%',
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
});

export default memo(Session);
