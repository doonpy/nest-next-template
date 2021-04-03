export default class UserName {
  constructor(private _value: string) {}

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }
}
