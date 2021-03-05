import produce from 'immer';

import {
  JOIN_PINNED_USER_RECEIVE,
  JOIN_SPEAKER_RECEIVE,
  LEAVE_PINNED_USER_RECEIVE,
  LEAVE_SPEAKER_RECEIVE,
} from '../../../containers/SessionPage/constants';
import * as types from '../constants';

const initialState = {
  /**
   * Peer ведущего
   */
  speaker: undefined,

  /**
   * Пиры закреплённых пользователей
   */
  pinned: {},

  /**
   * Все остальные пиры
   */
  peers: {},
};

/* eslint-disable default-case, no-param-reassign */
const peers = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_ROOM_STATE:
        if (action.payload.state === 'closed') {
          draft.speaker = initialState.speaker;
          draft.pinned = initialState.pinned;
          draft.peers = initialState.peers;
        }
        break;

      case types.ADD_PEER:
        draft.peers[action.peer.id] = action.peer;
        break;

      case types.ADD_SPEAKER_PEER:
        draft.speaker = action.peer;
        break;

      case types.ADD_PINNED_PEER:
        draft.pinned[action.peer.id] = action.peer;
        break;

      case JOIN_SPEAKER_RECEIVE:
        if (action.payload.id in state.peers) {
          draft.speaker = state.peers[action.payload.id];
          delete draft.peers[action.payload.id];
        } else if (action.payload.id in state.pinned) {
          draft.speaker = state.pinned[action.payload.id];
          delete draft.pinned[action.payload.id];
        }
        // если спикер уже есть, то его нужно перевести либо в привязанные, либо
        // в обычные пиры
        break;

      case LEAVE_SPEAKER_RECEIVE:
        if (state.speaker?.id === action.speakerId) {
          if (action.isPinned) {
            draft.pinned[action.speakerId] = state.speaker;
            delete draft.speaker;
          } else {
            draft.peers[action.speakerId] = state.speaker;
            delete draft.speaker;
          }
        }
        break;

      case JOIN_PINNED_USER_RECEIVE:
        if (action.payload.isSpeaker) {
          // если пользователь в данный момент спикер, то никуда его не
          // перемещаем
          break;
        } else if (action.payload.id in state.peers) {
          // Перемещаем пира из общих в закреплённые
          draft.pinned[action.payload.id] = state.peers[action.payload.id];
          delete draft.peers[action.payload.id];
        } else if (draft.speaker?.id === action.payload.id) {
          // Если он до этого был спикером, то из спикера перемещаем
          draft.pinned[action.payload.id] = state.speaker;
          delete draft.speaker;
        }
        break;

      case LEAVE_PINNED_USER_RECEIVE:
        // скорее всего не будет случая, когда ведущий в pinned находится
        // потому что мы его в приоритете в спикеры выводим
        if (!action.isSpeaker && action.pinnedId in state.pinned) {
          draft.peers[action.pinnedId] = state.pinned[action.pinnedId];
          delete draft.pinned[action.pinnedId];
        }
        break;

      case types.REMOVE_PEER:
        delete draft.peers[action.payload.peerId];
        break;

      case types.REMOVE_SPEAKER_PEER:
        draft.speaker = initialState.speaker;
        break;

      case types.REMOVE_PINNED_PEER:
        delete draft.pinned[action.payload.peerId];
        break;

      case types.SET_PEER_DISPLAY_NAME:
        if (state.speaker?.id === action.peerId) {
          draft.speaker.displayName = action.displayName;
        } else if (state.pinned[action.peerId]) {
          draft.pinned[action.peerId].displayName = action.displayName;
        } else if (state.peers[action.peerId]) {
          draft.peers[action.peerId].displayName = action.displayName;
        }
        break;

      case types.CHANGE_PEER_SETTINGS: {
        const { settings, peerId } = action.payload;

        if (state.speaker?.id === peerId) {
          draft.speaker.settings = {
            ...state.speaker.settings,
            ...settings,
          };
        } else if (state.pinned[peerId]) {
          draft.pinned[peerId].settings = {
            ...state.pinned[peerId].settings,
            ...settings,
          };
        } else if (state.peers[peerId]) {
          draft.peers[peerId].settings = {
            ...state.peers[peerId].settings,
            ...settings,
          };
        }
        break;
      }

      case types.ADD_CONSUMER: {
        const { consumer, peerId } = action.payload;

        if (state.speaker?.id === peerId) {
          if (state.speaker.consumers.indexOf(consumer.id) === -1) {
            draft.speaker.consumers.push(consumer.id);
          }
        } else if (state.pinned[peerId]) {
          if (state.pinned[peerId].consumers.indexOf(consumer.id) === -1) {
            draft.pinned[peerId].consumers.push(consumer.id);
          }
        } else if (state.peers[peerId]) {
          if (state.peers[peerId].consumers.indexOf(consumer.id) === -1) {
            draft.peers[peerId].consumers.push(consumer.id);
          }
        }
        break;
      }

      case types.REMOVE_CONSUMER: {
        const { consumerId, peerId } = action.payload;

        // NOTE: This means that the Peer was closed before, so it's ok.
        if (state.speaker?.id === peerId) {
          const index = state.speaker.consumers.findIndex(
            (id) => id === consumerId,
          );
          if (index !== -1) {
            draft.speaker.consumers.splice(index, 1);
          }
        } else if (state.pinned[peerId]) {
          const index = state.pinned[peerId].consumers.findIndex(
            (id) => id === consumerId,
          );
          if (index !== -1) {
            draft.pinned[peerId].consumers.splice(index, 1);
          }
        } else if (state.peers[peerId]) {
          const index = state.peers[peerId].consumers.findIndex(
            (id) => id === consumerId,
          );
          if (index !== -1) {
            draft.peers[peerId].consumers.splice(index, 1);
          }
        }
        break;
      }
    }
  });

export default peers;
