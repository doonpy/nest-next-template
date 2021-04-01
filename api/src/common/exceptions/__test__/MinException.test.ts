import MinException from '../MinException';

describe('MinException', () => {
  describe('getMessage', () => {
    const cases: Array<[string, number]> = [
      ["'$property' must have min value is 1.", 1],
      ["'$property' must have min value is 2.", 2]
    ];

    it.each(cases)('should return message is "%s"', (expected, value) => {
      const minException = new MinException(value);
      const message = minException.getMessage();

      expect(message).toEqual(expected);
    });
  });
});
