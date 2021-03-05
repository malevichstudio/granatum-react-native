import peersReducer from '../peers';
import * as actions from '../../actions';

/* eslint-disable default-case, no-param-reassign */
describe('peersReducer', () => {
  let state;
  beforeEach(() => {
    state = {};
  });

  it('should return the initial state', () => {
    expect(peersReducer(undefined, {})).toEqual(state);
  });

  it('should handle the setRoomState action correctly', () => {
    const fixture = 'closed';
    expect(peersReducer(state, actions.setRoomState(fixture))).toEqual(state);
  });

  it('should handle the addPeer action correctly', () => {
    const data = { id: 1 };
    const expectedResult = {
      1: data,
    };
    expect(peersReducer(state, actions.addPeer(data))).toEqual(expectedResult);
  });

  it('should handle the removePeer action correctly', () => {
    state = { 1: { id: 1 } };
    expect(peersReducer(state, actions.removePeer(1))).toEqual({});
  });

  it('should handle the setPeerDisplayName action correctly', () => {
    state = { 1: { id: 1 } };
    const expectedResult = { 1: { id: 1, displayName: 'test' } };
    expect(peersReducer(state, actions.setPeerDisplayName('test', 1))).toEqual(
      expectedResult,
    );
  });

  it('should handle the addConsumer action correctly', () => {
    state = { 1: { id: 1, consumers: [] } };
    const expectedResult = {
      1: { id: 1, consumers: [1] },
    };
    expect(peersReducer(state, actions.addConsumer({ id: 1 }, 1))).toEqual(
      expectedResult,
    );
  });

  it('should handle the removeConsumer action correctly', () => {
    state = { 1: { id: 1, consumers: [1] } };
    const expectedResult = {
      1: { id: 1, consumers: [] },
    };
    expect(peersReducer(state, actions.removeConsumer(1, 1))).toEqual(
      expectedResult,
    );
  });
});
