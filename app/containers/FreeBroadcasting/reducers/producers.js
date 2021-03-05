import produce from 'immer';
import * as types from '../constants';

const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const producers = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ROOM_STATE:
        if (action.payload.state === 'closed') {
          return initialState;
        }
        break;

      case types.ADD_PRODUCER: {
        const { producer } = action.payload;
        draft[producer.id] = producer;
        break;
      }

      case types.REMOVE_PRODUCER: {
        const { producerId } = action.payload;
        delete draft[producerId];
        break;
      }

      case types.SET_PRODUCER_PAUSED: {
        const { producerId } = action.payload;
        draft[producerId].paused = true;
        break;
      }

      case types.SET_PRODUCER_RESUMED:
        draft[action.payload.producerId].paused = false;
        break;

      case types.SET_PRODUCER_TRACK: {
        const { producerId, track } = action.payload;
        draft[producerId].track = track;
        break;
      }

      case types.SET_PRODUCER_SCORE: {
        const { producerId, score } = action.payload;
        draft[producerId].score = score;
        break;
      }
    }
  });

export default producers;
