import CreatedAt from '../value-object/created-at.value-object';
import UpdatedAt from '../value-object/updated-at.value-object';
import Id from '../value-object/id.value-object';

export default class BaseEntity {
  private _createdAt: CreatedAt;
  private _updatedAt: UpdatedAt;
  private _id: Id;

  constructor(id?: Id, createdAt?: Date, updatedAt?: Date) {
    this._id = id || new Id();
    this._createdAt = new CreatedAt(createdAt);
    this._updatedAt = new UpdatedAt(updatedAt || new Date(), this._createdAt.value);
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = new UpdatedAt(updatedAt, this._createdAt.value);
  }

  get createdAt(): Date {
    return this._createdAt.value;
  }

  get updatedAt(): Date {
    return this._updatedAt.value;
  }

  get id(): Id {
    return this._id;
  }
}
