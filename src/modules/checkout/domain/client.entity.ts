import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import Id from '../../@shared/domain/value-object/id.value-object';
import BaseEntity from '../../@shared/domain/entity/base.entity';

interface ClientProps {
  createdAt?: Date;
  updatedAt?: Date;
  address: string;
  email: string;
  name: string;
  id?: Id;
}

export default class Client extends BaseEntity implements AggregateRoot {
  private _address: string;
  private _email: string;
  private _name: string;

  constructor(props: ClientProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._email = props.email;
    this._address = props.address;
  }

  get address(): string {
    return this.address;
  }

  get email(): string {
    return this.email;
  }

  get name(): string {
    return this.name;
  }
}
