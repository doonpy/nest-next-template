import UserId from '../UserId';

describe('UserAge', () => {
  const value = 1;
  const userId = new UserId(value);

  describe('get value', () => {
    it('should return correct value', () => {
      expect(userId.value).toEqual(value);
    });
  });

  describe('set value', () => {
    it('should set correct value', () => {
      const newValue = 3;

      userId.value = newValue;

      expect(userId.value).toEqual(newValue);
    });
  });
});
