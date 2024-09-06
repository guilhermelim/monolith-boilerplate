import TransactionId from '../value-object/transaction-id.value-object';
import PaymentGateway from '../gateway/payment.gateway';
import Transaction from '../domain/transaction.entity';
import TransactionModel from './transaction.model';

export default class TransactionRepository implements PaymentGateway {
  async save(input: Transaction): Promise<Transaction> {
    await TransactionModel.create({
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      id: input.id.id,
    });

    return new Transaction({
      id: new TransactionId(input.id.id),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
    });
  }
}
