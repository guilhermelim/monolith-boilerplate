import { Sequelize } from 'sequelize-typescript';

import TransactionId from '../value-object/transaction-id.value-object';
import TransactionRepository from './transaction.repository';
import Transaction from '../domain/transaction.entity';
import TransactionModel from './transaction.model';

describe('transaction repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      sync: { force: true },
      storage: ':memory:',
      dialect: 'sqlite',
      logging: false,
    });

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should save transaction', async () => {
    const transaction = new Transaction({
      id: new TransactionId('1'),
      orderId: '1',
      amount: 100,
    });

    transaction.approve();

    const repository = new TransactionRepository();
    const result = await repository.save(transaction);

    expect(result.id).toBeDefined();
    expect(result.id.id).toBe('1');
    expect(result.status).toBe('approved');
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe('1');
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
