export default class RequiredException {
  constructor(private readonly target: string) {}

  public getMessage(): string {
    return `${this.target} is required.`;
  }
}
