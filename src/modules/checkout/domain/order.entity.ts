import Id from '../../@shared/domain/value-object/id.value-object';
import BaseEntity from '../../@shared/domain/entity/base.entity';
import Product from './product.entity';
import Client from './client.entity';

export enum OrderStatus {
  APPROVED = 'approved',
  DECLINED = 'declined',
  PENDING = 'pending',
}

interface OrderProps {
  status?: OrderStatus;
  products: Product[];
  createdAt?: Date;
  updatedAt?: Date;
  client: Client;
  id?: Id;
}

export default class Order extends BaseEntity {
  private _products: Product[];
  private _client: Client;
  private _status: string;

  constructor(props: OrderProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._client = props.client;
    this._products = props.products;
    this._status = props.status || OrderStatus.PENDING;
  }

  approved(): void {
    this._status = OrderStatus.APPROVED;
  }

  declined(): void {
    this._status = OrderStatus.DECLINED;
  }

  get total(): number {
    return this._products.reduce((total, product) => {
      return total + product.salesPrice;
    }, 0);
  }

  get products(): Product[] {
    return this._products;
  }

  get client(): Client {
    return this._client;
  }

  get status(): string {
    return this._status;
  }
}
