import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import Id from '../../@shared/domain/value-object/id.value-object';
import BaseEntity from '../../@shared/domain/entity/base.entity';

interface ProductProps {
  description: string;
  salesPrice: number;
  name: string;
  id: Id;
}

export default class Product extends BaseEntity implements AggregateRoot {
  private _description: string;
  private _salesPrice: number;
  private _name: string;

  constructor(props: ProductProps) {
    super(props.id);
    this._name = props.name;
    this._description = props.description;
    this._salesPrice = props.salesPrice;
  }

  get description(): string {
    return this._description;
  }

  get salesPrice(): number {
    return this._salesPrice;
  }

  get name(): string {
    return this._name;
  }
}
