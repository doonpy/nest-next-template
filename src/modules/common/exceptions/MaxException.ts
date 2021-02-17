export default class MaxException {
  constructor(private readonly maxValue: number) {}

  public getMessage(): string {
    return `$property must not have a value greater than ${this.maxValue}.`;
  }
}
