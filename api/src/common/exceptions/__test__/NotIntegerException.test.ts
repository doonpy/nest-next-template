import NotIntegerException from '../NotIntegerException';

describe('NotIntegerException', () => {
  describe('getMessage', () => {
    it('should return message is "\'$property\' must be integer."', () => {
      const notIntegerException = new NotIntegerException();
      const message = notIntegerException.getMessage();

      expect(message).toEqual("'$property' must be integer.");
    });
  });
});
