import ExceptionInterface from './ExceptionInterface';

export default class NotIntegerException implements ExceptionInterface {
  /** @inheritDoc **/
  public getMessage(): string {
    return `'$property' must be integer.`;
  }
}
