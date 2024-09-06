import { Sequelize } from 'sequelize-typescript';

import PaymentFacadeFactory from '../factory/payment.facade.factory';
import TransactionModel from '../repository/transaction.model';

describe('payment factory test', () => {
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

  it('should create a transaction', async () => {
    const facade = PaymentFacadeFactory.create();
    const input = {
      orderId: 'order-1',
      amount: 100,
    };

    const output = await facade.process(input);

    expect(output.transactionId).toBeDefined();
    expect(output.status).toBe('approved');
    expect(output.amount).toBe(100);
    expect(output.orderId).toBe('order-1');
    expect(output.createdAt).toBeDefined();
    expect(output.updatedAt).toBeDefined();
  });
});
