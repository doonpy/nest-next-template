export default class NotStringException {
  public getMessage(): string {
    return `'$property' must be string.`;
  }
}
