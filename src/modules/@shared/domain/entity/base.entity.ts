import Id from '../value-object/id.value-object';

export default class BaseEntity {
  private _createdAt: Date;
  private _updateAt: Date;
  private _id: Id;

  constructor(id?: Id) {
    this._id = id;
    this._createdAt = new Date();
    this._updateAt = new Date();
  }

  set updateAt(updateAt: Date) {
    this._updateAt = updateAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updateAt(): Date {
    return this._updateAt;
  }

  get id(): Id {
    return this._id;
  }
}
