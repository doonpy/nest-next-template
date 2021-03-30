export default class NotIntegerException {
  public getMessage(): string {
    return `'$property' must be integer.`;
  }
}
