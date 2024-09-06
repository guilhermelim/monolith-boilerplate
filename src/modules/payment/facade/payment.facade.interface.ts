import { PaymentFacadeOutputDto, PaymentFacadeInputDto } from './payment.facade.dto';

export default interface PaymentFacadeInterface {
  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>;
}
