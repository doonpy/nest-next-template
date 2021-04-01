import ExceptionInterface from './ExceptionInterface';

export default class MaxException implements ExceptionInterface {
  constructor(private readonly maxValue: number) {}

  /** @inheritDoc **/
  public getMessage(): string {
    return `$property must not have a value greater than ${this.maxValue}.`;
  }
}
