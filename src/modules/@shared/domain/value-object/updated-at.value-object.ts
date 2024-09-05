import ValueObject from './value-object.interface';

export default class UpdatedAt implements ValueObject {
  private readonly _value: Date;

  constructor(value: Date, createdAt: Date) {
    if (value < createdAt) {
      throw new Error('UpdatedAt cannot be earlier than CreatedAt.');
    }
    this._value = value;
  }

  get value(): Date {
    return this._value;
  }
}
