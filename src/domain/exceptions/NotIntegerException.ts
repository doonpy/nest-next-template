export default class NotIntegerException {
  constructor(private readonly target: string) {}

  public getMessage(): string {
    return `${this.target} must be integer.`;
  }
}
