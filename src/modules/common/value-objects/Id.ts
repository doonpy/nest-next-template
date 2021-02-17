export default class Id {
  constructor(private value: number) {}

  public setValue(value: number): void {
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }
}
