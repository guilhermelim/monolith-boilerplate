import TransactionId from '../value-object/transaction-id.value-object';
import Transaction, { TransactionStatus } from './transaction.entity';

describe('Transaction Unit Tests', () => {
  it('should create a transaction with pending status by default', () => {
    const transaction = new Transaction({
      orderId: 'order-1',
      amount: 50,
    });

    expect(transaction.status).toBe('pending');
    expect(transaction.orderId).toBe('order-1');
    expect(transaction.amount).toBe(50);
  });

  it('should process and approve transaction when amount is greater than or equal to 100', () => {
    const transaction = new Transaction({
      orderId: 'order-2',
      amount: 150,
    });

    transaction.process();

    expect(transaction.status).toBe('approved');
  });

  it('should process and decline transaction when amount is less than 100', () => {
    const transaction = new Transaction({
      orderId: 'order-3',
      amount: 50,
    });

    transaction.process();

    expect(transaction.status).toBe('declined');
  });

  it('should throw an error if the amount is negative', () => {
    expect(() => {
      const transaction = new Transaction({
        orderId: 'order-4',
        amount: -10,
      });
      transaction.validate();
    }).toThrowError('Amount cannot be negative');
  });

  it('should allow creation of a transaction with a specific status, id, and dates', () => {
    const transactionId = new TransactionId('1');
    const createdAt = new Date('2024-01-01T00:00:00Z');
    const updatedAt = new Date('2024-01-02T00:00:00Z');

    const transaction = new Transaction({
      status: TransactionStatus.APPROVED,
      createdAt: createdAt,
      updatedAt: updatedAt,
      orderId: 'order-5',
      id: transactionId,
      amount: 200,
    });

    expect(transaction.id.id).toBe('1');
    expect(transaction.amount).toEqual(200);
    expect(transaction.status).toBe('approved');
    expect(transaction.orderId).toEqual('order-5');
    expect(transaction.createdAt).toEqual(createdAt);
    expect(transaction.updatedAt).toEqual(updatedAt);
  });
});
