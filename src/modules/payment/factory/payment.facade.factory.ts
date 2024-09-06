import ProcessPaymentUsecase from '../usecase/process-payment/process-payment.usecase';
import TransactionRepository from '../repository/transaction.repository';
import PaymentFacadeInterface from '../facade/payment.facade.interface';
import PaymentFacade from '../facade/payment.facade';

export default class PaymentFacadeFactory {
  static create(): PaymentFacadeInterface {
    const repository = new TransactionRepository();
    const usecase = new ProcessPaymentUsecase(repository);
    const facade = new PaymentFacade(usecase);
    return facade;
  }
}
