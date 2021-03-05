import produce from 'immer';
import * as types from '../constants';

const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const consumers = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_ROOM_STATE: {
        const roomState = action.payload.state;
        if (roomState === 'closed') {
          return initialState;
        }
        break;
      }

      case types.ADD_CONSUMER: {
        const { consumer } = action.payload;
        if (!(consumer.id in state)) {
          draft[consumer.id] = consumer;
        }
        break;
      }

      case types.REMOVE_CONSUMER: {
        const { consumerId } = action.payload;
        delete draft[consumerId];
        break;
      }

      case types.SET_CONSUMER_PAUSED: {
        const { consumerId, originator } = action.payload;
        if (originator === 'local') {
          draft[consumerId].locallyPaused = true;
        } else {
          draft[consumerId].remotelyPaused = true;
        }
        break;
      }

      case types.SET_CONSUMER_RESUMED: {
        const { consumerId, originator } = action.payload;
        if (originator === 'local') {
          draft[consumerId].locallyPaused = false;
        } else {
          draft[consumerId].remotelyPaused = false;
        }
        break;
      }

      case types.SET_CONSUMER_PREFERRED_LAYERS: {
        const { consumerId, spatialLayer, temporalLayer } = action.payload;
        draft[consumerId].preferredSpatialLayer = spatialLayer;
        draft[consumerId].preferredTemporalLayer = temporalLayer;
        break;
      }

      case types.SET_CONSUMER_CURRENT_LAYERS: {
        const { consumerId, spatialLayer, temporalLayer } = action.payload;
        draft[consumerId].spatialLayer = spatialLayer;
        draft[consumerId].temporalLayer = temporalLayer;
        break;
      }
    }
  });

export default consumers;
