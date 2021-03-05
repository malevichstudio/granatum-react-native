import roomReducer from '../room';
import * as actions from '../../actions';

/* eslint-disable default-case, no-param-reassign */
describe('roomReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      url: null,
      state: 'new',
      activeSpeakerId: null,
    };
  });

  it('should return the initial state', () => {
    expect(roomReducer(undefined, {})).toEqual(state);
  });

  it('should handle the setRoomState action correctly', () => {
    const fixture = 'closed';
    const expectedResult = { ...state, state: 'closed' };

    expect(roomReducer(state, actions.setRoomState(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setRoomActiveSpeaker action correctly', () => {
    const expectedResult = { ...state, activeSpeakerId: 1 };

    expect(roomReducer(state, actions.setRoomActiveSpeaker(1))).toEqual(
      expectedResult,
    );
  });

  it('should handle the removePeer action correctly', () => {
    state = { ...state, activeSpeakerId: 1 };
    const expectedResult = { ...state, activeSpeakerId: null };

    expect(roomReducer(state, actions.removePeer(1))).toEqual(expectedResult);
  });
});
