import { ProcessPaymentOutputDto, ProcessPaymentInputDto } from './process-payment.dto';
import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import PaymentGateway from '../../gateway/payment.gateway';
import Transaction from '../../domain/transaction.entity';

export default class ProcessPaymentUsecase implements UseCaseInterface {
  constructor(private transactionRepository: PaymentGateway) {}

  async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction({
      orderId: input.orderId,
      amount: input.amount,
    });
    transaction.process();

    const persistTransaction = await this.transactionRepository.save(transaction);

    return {
      transactionId: persistTransaction.id.id,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
      orderId: persistTransaction.orderId,
      amount: persistTransaction.amount,
      status: persistTransaction.status,
    };
  }
}
