import { AddProductOutputDto, AddProductInputDto } from './add-product.dto';
import Id from '../../../@shared/domain/value-object/id.value-object';
import ProductGateway from '../../gateway/product.gateway';
import Product from '../../domain/product.entity';

export default class AddProductUsecase {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = {
      purchasePrice: input.purchasePrice,
      description: input.description,
      id: new Id(input.id),
      stock: input.stock,
      name: input.name,
    };
    const product = new Product(props);
    this._productRepository.add(product);

    return {
      purchasePrice: product.purchasePrice,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updateAt,
      stock: product.stock,
      name: product.name,
      id: product.id.id,
    };
  }
}
