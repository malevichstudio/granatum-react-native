import { getInitials } from '..';

describe('getInitials', () => {
  it('should extract first letter from the name', () => {
    expect(getInitials('John')).toBe('J');
  });

  it('should extract first letters from the name and surname', () => {
    expect(getInitials('John Smith')).toBe('JS');
  });

  it('should return only two initials even if there is three names', () => {
    expect(getInitials('John Smith Junior')).toBe('JS');
  });
});
