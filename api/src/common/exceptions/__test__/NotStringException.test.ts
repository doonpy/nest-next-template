import NotStringException from '../NotStringException';

describe('NotStringException', () => {
  describe('getMessage', () => {
    it('should return message is "\'$property\' must be string."', () => {
      const notStringException = new NotStringException();
      const message = notStringException.getMessage();

      expect(message).toEqual("'$property' must be string.");
    });
  });
});
