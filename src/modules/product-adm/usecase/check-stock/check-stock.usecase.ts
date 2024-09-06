import { CheckStockOutputDto, CheckStockInputDto } from './check-stock-dto';
import ProductGateway from '../../gateway/product.gateway';

export default class CheckStockUseCase {
  constructor(private _productRepository: ProductGateway) {}

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this._productRepository.find(input.productId);
    return {
      productId: product.id.id,
      stock: product.stock,
    };
  }
}
