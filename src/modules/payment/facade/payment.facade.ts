import { PaymentFacadeOutputDto, PaymentFacadeInputDto } from './payment.facade.dto';
import UseCaseInterface from '../../@shared/usecase/use-case.interface';
import PaymentFacadeInterface from './payment.facade.interface';

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private _processPaymentUsecase: UseCaseInterface) {}

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    const result = await this._processPaymentUsecase.execute(input);
    return result as PaymentFacadeOutputDto;
  }
}
