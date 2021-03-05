import { arrayFind } from '..';

describe('arrayFind', () => {
  it('should return value when array is filled', () => {
    expect(arrayFind(['val1', 'val2', 'val3'])(v => v === 'val2')).toBe('val2');
    expect(
      arrayFind([{ value: 'val1' }, { value: 'val2' }, { value: 'val3' }])(
        v => v.value === 'val2',
      ),
    ).toEqual({ value: 'val2' });
  });

  it('should return null when array is empty', () => {
    expect(arrayFind([])(v => v === 'val2')).toBeNull();
  });

  it('should return null when object not an array', () => {
    expect(arrayFind({})(v => v === 'val2')).toBeNull();
    expect(arrayFind(1)(v => v === 'val2')).toBeNull();
    expect(arrayFind('string')(v => v === 'val2')).toBeNull();
    expect(arrayFind(new Map())(v => v === 'val2')).toBeNull();
  });
});
