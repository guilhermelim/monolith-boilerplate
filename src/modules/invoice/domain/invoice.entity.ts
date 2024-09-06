import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import Id from '../../@shared/domain/value-object/id.value-object';
import BaseEntity from '../../@shared/domain/entity/base.entity';
import Product from './product.entity';

interface InvoiceProps {
  items: Product[];
  createdAt?: Date;
  updatedAt?: Date;
  address: string;
  name: string;
  id?: Id;
}

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _items: Product[];
  private _address: string;
  private _name: string;

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._address = props.address;
    this._items = props.items;
  }

  add(product: Product) {
    this._items.push(product);
  }

  get total(): number {
    return this._items.reduce((total, item) => total + item.price, 0);
  }

  get address(): string {
    return this._address;
  }

  get items(): Product[] {
    return this._items;
  }

  get name(): string {
    return this._name;
  }
}
