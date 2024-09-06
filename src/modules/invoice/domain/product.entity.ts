import Id from '../../@shared/domain/value-object/id.value-object';
import BaseEntity from '../../@shared/domain/entity/base.entity';

interface ProductProps {
  price: number;
  name: string;
  id?: Id;
}

export default class Product extends BaseEntity {
  private _price: number;
  private _name: string;

  constructor(props: ProductProps) {
    super(props.id);
    this._name = props.name;
    this._price = props.price;
  }

  get price(): number {
    return this._price;
  }

  get name(): string {
    return this._name;
  }
}
