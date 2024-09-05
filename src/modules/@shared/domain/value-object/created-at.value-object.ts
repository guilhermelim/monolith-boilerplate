import ValueObject from './value-object.interface';

export default class CreatedAt implements ValueObject {
  private readonly _value: Date;

  constructor(value?: Date) {
    this._value = value || new Date();
  }

  get value(): Date {
    return this._value;
  }
}
