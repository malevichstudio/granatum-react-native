import produce from 'immer';
import * as types from '../constants';

const initialState = {
  url: null,
  state: 'new', // new/connecting/connected/disconnected/closed,
  activeSpeakerId: null,
};

/* eslint-disable default-case, no-param-reassign */
const room = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_ROOM_STATE: {
        const roomState = action.payload.state;
        if (roomState === 'closed') {
          draft.url = initialState.url;
          draft.activeSpeakerId = initialState.activeSpeakerId;
        }
        draft.state = roomState;
        break;
      }

      case types.SET_ROOM_ACTIVE_SPEAKER: {
        const { peerId } = action.payload;
        draft.activeSpeakerId = peerId;
        break;
      }

      case types.REMOVE_PEER: {
        const { peerId } = action.payload;
        if (peerId && peerId === state.activeSpeakerId) {
          draft.activeSpeakerId = null;
        }
      }
    }
  });

export default room;
