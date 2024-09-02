import { randomUUID as uuid } from 'node:crypto';

import ValueObject from './value-object.interface';

export default class Id implements ValueObject {
  private _id: string;

  constructor(id?: string) {
    this._id = id || uuid();
  }

  get id(): string {
    return this._id;
  }
}
