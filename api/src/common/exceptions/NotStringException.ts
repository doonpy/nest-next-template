import ExceptionInterface from './ExceptionInterface';

export default class NotStringException implements ExceptionInterface {
  /** @inheritDoc **/
  public getMessage(): string {
    return `'$property' must be string.`;
  }
}
