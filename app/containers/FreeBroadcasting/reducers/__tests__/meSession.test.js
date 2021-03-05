import meReducer from '../me';
import * as actions from '../../actions';

/* eslint-disable default-case, no-param-reassign */
describe('meReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      id: null,
      displayName: null,
      displayNameSet: false,
      settings: {},
      device: null,
      canSendMic: false,
      canSendWebcam: false,
      canChangeWebcam: false,
      webcamInProgress: false,
      audioMuted: false,
    };
  });

  it('should return the initial state', () => {
    expect(meReducer(undefined, {})).toEqual(state);
  });

  it('should handle the setRoomState action correctly', () => {
    const fixture = 'closed';
    expect(meReducer(state, actions.setRoomState(fixture))).toEqual(state);
  });

  it('should handle the setMe action correctly', () => {
    const data = {
      peerId: 1,
      displayName: 'test',
      displayNameSet: true,
      device: {},
    };
    const expectedResult = {
      ...state,
      id: data.peerId,
      displayName: data.displayName,
      displayNameSet: data.displayNameSet,
      device: data.device,
    };
    expect(meReducer(state, actions.setMe(data))).toEqual(expectedResult);
  });

  it('should handle the setMediaCapabilities action correctly', () => {
    const data = {
      canSendMic: true,
      canSendWebcam: true,
    };
    const expectedResult = {
      ...state,
      ...data,
    };
    expect(meReducer(state, actions.setMediaCapabilities(data))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setCanChangeWebcam action correctly', () => {
    const data = {
      canChangeWebcam: true,
    };
    const expectedResult = {
      ...state,
      ...data,
    };
    expect(
      meReducer(state, actions.setCanChangeWebcam(data.canChangeWebcam)),
    ).toEqual(expectedResult);
  });

  it('should handle the setWebcamInProgress action correctly', () => {
    const data = {
      webcamInProgress: true,
    };
    const expectedResult = {
      ...state,
      ...data,
    };
    expect(
      meReducer(state, actions.setWebcamInProgress(data.webcamInProgress)),
    ).toEqual(expectedResult);
  });

  it('should handle the setAudioMutedState action correctly', () => {
    const data = {
      audioMuted: true,
    };
    const expectedResult = {
      ...state,
      ...data,
    };
    expect(
      meReducer(state, actions.setAudioMutedState(data.audioMuted)),
    ).toEqual(expectedResult);
  });
});
