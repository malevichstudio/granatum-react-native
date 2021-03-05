import { lastOrNull } from '..';

describe('lastOrNull', () => {
  it('should return last element', () => {
    expect(lastOrNull(['val1', 'val2', 'val3'])).toBe('val3');
  });

  it('should return null when not array', () => {
    expect(lastOrNull(undefined)).toBeNull();
  });

  it('should return null when array is empty', () => {
    expect(lastOrNull([])).toBeNull();
  });
});
