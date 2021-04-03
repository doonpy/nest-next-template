import UserAge from '../UserAge';

describe('UserAge', () => {
  const value = 1;
  const userAge = new UserAge(value);

  describe('get value', () => {
    it('should return correct value', () => {
      expect(userAge.value).toEqual(value);
    });
  });

  describe('set value', () => {
    it('should set correct value', () => {
      const newValue = 2;

      userAge.value = newValue;

      expect(userAge.value).toEqual(newValue);
    });
  });
});
