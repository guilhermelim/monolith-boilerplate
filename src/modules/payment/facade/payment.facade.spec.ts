import { Sequelize } from 'sequelize-typescript';

import ProcessPaymentUsecase from '../usecase/process-payment/process-payment.usecase';
import TransactionRepository from '../repository/transaction.repository';
import TransactionModel from '../repository/transaction.model';
import PaymentFacade from './payment.facade';

describe('payment repository test', () => {
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
    const repository = new TransactionRepository();
    const usecase = new ProcessPaymentUsecase(repository);
    const facade = new PaymentFacade(usecase);

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
