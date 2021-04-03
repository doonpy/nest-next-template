import UserName from '../UserName';

describe('UserName', () => {
  const value = 'foo';
  const userName = new UserName(value);

  describe('get value', () => {
    it('should return correct value', () => {
      expect(userName.value).toEqual(value);
    });
  });

  describe('set value', () => {
    it('should set correct value', () => {
      const newValue = 'baz';

      userName.value = newValue;

      expect(userName.value).toEqual(newValue);
    });
  });
});
