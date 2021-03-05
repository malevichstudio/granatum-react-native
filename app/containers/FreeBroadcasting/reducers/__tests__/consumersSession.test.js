import consumerReducer from '../consumers';
import * as actions from '../../actions';

/* eslint-disable default-case, no-param-reassign */
describe('consumerReducer', () => {
  let state;
  beforeEach(() => {
    state = {};
  });

  it('should return the initial state', () => {
    expect(consumerReducer(undefined, {})).toEqual(state);
  });

  it('should handle the setRoomState action correctly', () => {
    const fixture = 'closed';
    const expectedResult = {};

    expect(consumerReducer(state, actions.setRoomState(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the addConsumer action correctly', () => {
    const expectedResult = { test: { id: 'test' } };
    expect(
      consumerReducer(state, actions.addConsumer({ id: 'test' }, 1)),
    ).toEqual(expectedResult);
  });

  it('should handle the removeConsumer action correctly', () => {
    state = { test: { id: 'test' } };
    const expectedResult = {};
    expect(consumerReducer(state, actions.removeConsumer('test'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setConsumerPaused action correctly', () => {
    state = { test: { id: 'test' } };
    const expectedResult = { test: { id: 'test', locallyPaused: true } };
    expect(
      consumerReducer(state, actions.setConsumerPaused('test', 'local')),
    ).toEqual(expectedResult);
  });

  it('should handle the setConsumerResumed action correctly', () => {
    state = { test: { id: 'test', locallyPaused: true } };
    const expectedResult = { test: { id: 'test', locallyPaused: false } };
    expect(
      consumerReducer(state, actions.setConsumerResumed('test', 'local')),
    ).toEqual(expectedResult);
  });

  // it('should handle the setConsumerPreferredLayers action correctly', () => {
  //   state = { test: { id: 'test' } };
  //   const expectedResult = {
  //     test: {
  //       id: 'test',
  //       preferredSpatialLayer: 1,
  //       preferredTemporalLayer: 1,
  //     },
  //   };
  //   expect(
  //     consumerReducer(state, actions.setConsumerPreferredLayers('test', 1, 1)),
  //   ).toEqual(expectedResult);
  // });
});
