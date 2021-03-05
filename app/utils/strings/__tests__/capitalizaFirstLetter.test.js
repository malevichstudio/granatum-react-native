import { capitalizeFirstLetter } from '..';

describe('capitalizeFirstLetter', () => {
  it('should capitalize first letter', () => {
    expect(capitalizeFirstLetter('test')).toEqual('Test');
  });

  it('should capitalize single letter', () => {
    expect(capitalizeFirstLetter('t')).toEqual('T');
  });
});
