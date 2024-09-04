import { FindProductOutputDto, FindProductInputDto } from './find-product.dto';
import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import ProductGateway from '../../gateway/product.gateway';

export default class FindProductUsecase implements UseCaseInterface {
  constructor(private readonly _productRepository: ProductGateway) {}

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this._productRepository.find(input.id);
    return {
      description: product.description,
      salesPrice: product.salesPrice,
      name: product.name,
      id: product.id.id,
    };
  }
}
