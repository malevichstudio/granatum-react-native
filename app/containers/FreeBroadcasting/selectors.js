import { createSelector } from 'reselect';
import { injectionKeys } from '../../config';

/**
 * Direct selector to the `session` state domain
 */
const selectVideoChatDomain = (state) => state[injectionKeys.videoChat] || {};

export const selectRoom = createSelector(selectVideoChatDomain, (subState) =>
  subState ? subState.room : {},
);

const selectAllPeers = createSelector(
  selectVideoChatDomain,
  (session) => session.peers,
);

export const selectPeers = createSelector(
  selectAllPeers,
  (allPeers) => allPeers?.peers || {},
);

export const selectSpeaker = createSelector(
  selectAllPeers,
  (allPeers) => allPeers?.speaker,
);

export const selectPinned = createSelector(
  selectAllPeers,
  (allPeers) => allPeers?.pinned || {},
);

export const makeSelectPeersLength = (type) =>
  createSelector(selectAllPeers, (peers) => {
    if (peers) {
      // в sessionVideoChat у нас всегда присутствуют пиры вообще всех юзеров,
      // которые есть в сессии, даже, если они на командных/индивидуальных
      // листах, поэтому нам нужно фильтровать кол-во только по юзерам, которые
      // действительно находятся на общем листе, т.е. видны в данном чате
      // Тоже касается и teamVideoChat. Если там был создан peer, то он там
      // и останется, даже если юзер ушёл на другой тип листа
      // +true - это 1, +false - это 0
      const speakerCount = peers.speaker
        ? +(peers.speaker.settings.sheetType === type)
        : 0;
      const pinnedCount = Object.keys(peers.pinned).filter(
        (peer) => peers.pinned[peer].settings.sheetType === type,
      ).length;
      const othersCount = Object.keys(peers.peers).filter(
        (peer) => peers.peers[peer].settings.sheetType === type,
      ).length;
      // последняя единичка -- это сам пользователь
      return speakerCount + pinnedCount + othersCount + 1;
    }

    return 0;
  });

const selectMe = createSelector(selectVideoChatDomain, (session) => session.me);

export const selectCanSendMic = createSelector(selectMe, (me) => me.canSendMic);

export const selectCanSendWebcam = createSelector(
  selectMe,
  (me) => me.canSendWebcam,
);

export const selectWebcamInProgress = createSelector(
  selectMe,
  (me) => me.webcamInProgress,
);

export const selectShareInProgress = createSelector(
  selectMe,
  (me) => me.shareInProgress,
);

export const selectBroadcastToAll = createSelector(
  selectMe,
  (me) => me.settings?.broadcastToAll,
);

export const selectProducers = createSelector(
  selectVideoChatDomain,
  (session) => session.producers,
);

export const selectConsumers = createSelector(
  selectVideoChatDomain,
  (session) => (session ? session.consumers : {}),
);

/**
 * Достаём из списка консумеров того, который шарит экран
 * @param state
 * @returns {null|*}
 */
export const selectShareConsumer = (state) => {
  if (state.videoChat) {
    const consumersArray = Object.keys(state.videoChat.consumers);
    for (let i = 0; i < consumersArray.length; i += 1) {
      if (state.videoChat.consumers[consumersArray[i]].share) {
        return state.videoChat.consumers[consumersArray[i]];
      }
    }
  }
  return null;
};

export const selectActiveSpeakerId = createSelector(
  selectRoom,
  (room) => room.activeSpeakerId,
);
