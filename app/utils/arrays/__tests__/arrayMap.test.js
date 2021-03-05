import { arrayMap } from '..';

describe('arrayMap', () => {
  it('should return modified array when array is filled', () => {
    expect(arrayMap(['val1', 'val2', 'val3'])(v => `${v}i`)).toEqual([
      'val1i',
      'val2i',
      'val3i',
    ]);
  });

  it('should return null when array is empty', () => {
    expect(arrayMap([])(v => `${v}i`)).toBeNull();
  });

  it('should return null when object not an array', () => {
    expect(arrayMap({})(v => `${v}i`)).toBeNull();
    expect(arrayMap(1)(v => `${v}i`)).toBeNull();
    expect(arrayMap('string')(v => `${v}i`)).toBeNull();
    expect(arrayMap(new Map())(v => `${v}i`)).toBeNull();
  });
});
