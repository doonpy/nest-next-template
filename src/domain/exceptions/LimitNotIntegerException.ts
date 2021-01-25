import NotIntegerException from './NotIntegerException';

export default class LimitNotIntegerException extends NotIntegerException {
  constructor() {
    super('Limit');
  }
}
