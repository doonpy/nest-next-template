import ExceptionInterface from './ExceptionInterface';

export default class MinException implements ExceptionInterface {
  constructor(private readonly minValue: number) {}

  /** @inheritDoc **/
  public getMessage(): string {
    return `'$property' must have min value is ${this.minValue}.`;
  }
}
