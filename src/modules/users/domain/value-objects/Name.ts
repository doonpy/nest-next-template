export default class Name {
  constructor(private value: string) {}

  public setValue(value: string): void {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }
}
