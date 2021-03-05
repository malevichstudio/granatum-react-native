import produce from 'immer';

import * as types from '../constants';

const initialState = {
  id: null,
  displayName: null,
  displayNameSet: false,
  settings: {},
  device: null,
  canSendMic: false,
  canSendWebcam: false,
  canChangeWebcam: false,
  webcamInProgress: false,
  shareInProgress: false,
  audioMuted: false,
  produce: false,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ROOM_STATE:
        if (action.payload.state === 'closed') {
          draft.id = initialState.id;
          draft.displayName = initialState.displayName;
          draft.displayNameSet = initialState.displayNameSet;
          draft.settings = initialState.settings;
          draft.device = initialState.device;
          draft.canSendMic = initialState.canSendMic;
          draft.canSendWebcam = initialState.canSendWebcam;
          draft.canChangeWebcam = initialState.canChangeWebcam;
          draft.webcamInProgress = initialState.webcamInProgress;
          draft.shareInProgress = initialState.shareInProgress;
          draft.audioMuted = initialState.audioMuted;
          draft.produce = initialState.produce;
        }
        break;

      case types.SET_ME:
        draft.id = action.payload.peerId;
        draft.displayName = action.payload.displayName;
        draft.displayNameSet = action.payload.displayNameSet;
        draft.device = action.payload.device;
        draft.produce = action.payload.produce;
        break;

      case types.SET_PRODUCE:
        draft.produce = action.produce;
        break;

      case types.SET_DISPLAY_NAME:
        if (action.displayName) {
          draft.displayName = state.displayName;
          draft.displayNameSet = true;
        }
        break;

      case types.CHANGE_ME_SETTINGS:
        draft.settings = {
          ...state.settings,
          ...action.settings,
        };
        break;

      case types.SET_MEDIA_CAPABILITIES:
        if (typeof action.payload.canSendMic === 'boolean') {
          draft.canSendMic = action.payload.canSendMic;
        }
        if (typeof action.payload.canSendWebcam === 'boolean') {
          draft.canSendWebcam = action.payload.canSendWebcam;
        }
        break;

      case types.SET_CAN_CHANGE_WEBCAM:
        draft.canChangeWebcam = action.payload;
        break;

      case types.SET_WEBCAM_IN_PROGRESS:
        draft.webcamInProgress = action.payload.flag;
        break;

      case types.SET_SHARE_IN_PROGRESS:
        draft.shareInProgress = action.payload.flag;
        break;

      case types.SET_AUDIO_MUTED_STATE:
        draft.audioMuted = action.payload.enabled;
        break;
    }
  });
