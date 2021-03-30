export default class Id {
  constructor(private _value: number) {}

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}
