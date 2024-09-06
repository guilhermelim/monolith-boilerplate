import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import TransactionId from '../value-object/transaction-id.value-object';
import BaseEntity from '../../@shared/domain/entity/base.entity';

export enum TransactionStatus {
  APPROVED = 'approved',
  DECLINED = 'declined',
  PENDING = 'pending',
}

interface TransactionProps {
  status?: TransactionStatus;
  id?: TransactionId;
  createdAt?: Date;
  updatedAt?: Date;
  orderId: string;
  amount: number;
}

export default class Transaction extends BaseEntity implements AggregateRoot {
  private _status: TransactionStatus;
  private _orderId: string;
  private _amount: number;

  constructor(props: TransactionProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._amount = props.amount;
    this._orderId = props.orderId;
    this._status = props.status || TransactionStatus.PENDING;
  }

  process(): void {
    if (this._amount >= 100) {
      this.approve();
    } else {
      this.decline();
    }
  }

  validate(): void {
    if (this._amount < 0) {
      throw new Error('Amount cannot be negative');
    }
  }

  approve(): void {
    this._status = TransactionStatus.APPROVED;
  }

  decline(): void {
    this._status = TransactionStatus.DECLINED;
  }

  get status(): TransactionStatus {
    return this._status;
  }

  get orderId(): string {
    return this._orderId;
  }

  get amount(): number {
    return this._amount;
  }
}
