import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import Id from '../../@shared/domain/value-object/id.value-object';
import BaseEntity from '../../@shared/domain/entity/base.entity';

interface ProductProps {
  purchasePrice: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  stock: number;
  name: string;
  id?: Id;
}

export default class Product extends BaseEntity implements AggregateRoot {
  private _purchasePrice: number;
  private _description: string;
  private _stock: number;
  private _name: string;

  constructor(props: ProductProps) {
    super(props.id);
    this._name = props.name;
    this._description = props.description;
    this._purchasePrice = props.purchasePrice;
    this._stock = props.stock;
  }

  set purchasePrice(purchasePrice: number) {
    this._purchasePrice = purchasePrice;
  }

  set description(description: string) {
    this._description = description;
  }

  get purchasePrice(): number {
    return this._purchasePrice;
  }

  get description(): string {
    return this._description;
  }

  set stock(stock: number) {
    this._stock = stock;
  }

  set name(name: string) {
    this._name = name;
  }

  get stock(): number {
    return this._stock;
  }

  get name(): string {
    return this._name;
  }
}
