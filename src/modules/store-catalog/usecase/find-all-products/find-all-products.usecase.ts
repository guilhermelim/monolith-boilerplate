import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import { FindAllProductsOutputDto } from './find-all-products.dto';
import ProductGateway from '../../gateway/product.gateway';

export default class FindAllProductsUsecase implements UseCaseInterface {
  constructor(private _productRepository: ProductGateway) {}

  async execute(): Promise<FindAllProductsOutputDto> {
    const products = await this._productRepository.findAll();

    return {
      products: products.map((product) => ({
        description: product.description,
        salesPrice: product.salesPrice,
        name: product.name,
        id: product.id.id,
      })),
    };
  }
}
