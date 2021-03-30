export default class MinException {
  constructor(private readonly minValue: number) {}

  public getMessage(): string {
    return `'$property' must have min value is ${this.minValue}.`;
  }
}
