export default class Name {
  constructor(private _value: string) {}

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }
}
