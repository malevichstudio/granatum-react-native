import producerReducer from '../producers';
import * as actions from '../../actions';

/* eslint-disable default-case, no-param-reassign */
describe('producerReducer', () => {
  let state;
  beforeEach(() => {
    state = {};
  });

  it('should return the initial state', () => {
    expect(producerReducer(undefined, {})).toEqual(state);
  });

  it('should handle the setRoomState action correctly', () => {
    const fixture = 'closed';
    const expectedResult = {};

    expect(producerReducer(state, actions.setRoomState(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the addProducer action correctly', () => {
    const expectedResult = { test: { id: 'test' } };
    expect(
      producerReducer(state, actions.addProducer({ id: 'test' }, 1)),
    ).toEqual(expectedResult);
  });

  it('should handle the removeProducer action correctly', () => {
    state = { test: { id: 'test' } };
    const expectedResult = {};
    expect(producerReducer(state, actions.removeProducer('test'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setProducerPaused action correctly', () => {
    state = { test: { id: 'test' } };
    const expectedResult = { test: { id: 'test', paused: true } };
    expect(
      producerReducer(state, actions.setProducerPaused('test', 'local')),
    ).toEqual(expectedResult);
  });

  it('should handle the setProducerResumed action correctly', () => {
    state = { test: { id: 'test', paused: true } };
    const expectedResult = { test: { id: 'test', paused: false } };
    expect(
      producerReducer(state, actions.setProducerResumed('test', 'local')),
    ).toEqual(expectedResult);
  });
});
