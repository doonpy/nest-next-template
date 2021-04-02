import MaxException from '../MaxException';

describe('MaxException', () => {
  describe('getMessage', () => {
    const cases: Array<[string, number]> = [
      ["'$property' must not have a value greater than 1.", 1],
      ["'$property' must not have a value greater than 2.", 2]
    ];

    it.each(cases)('should return message is "%s"', (expected, value) => {
      const maxException = new MaxException(value);
      const message = maxException.getMessage();

      expect(message).toEqual(expected);
    });
  });
});
