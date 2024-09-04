import Id from '../../@shared/domain/value-object/id.value-object';
import ProductGateway from '../gateway/product.gateway';
import Product from '../domain/product.entity';
import ProductModel from './product.model';

export default class ProductRepository implements ProductGateway {
  async find(id: string): Promise<Product> {
    const productRecord = await ProductModel.findOne({
      where: { id },
    });

    if (!productRecord) {
      throw new Error(`Product with id ${id} not found`);
    }

    const product = productRecord.toJSON();

    return new Product({
      description: product.description,
      salesPrice: product.salesPrice,
      id: new Id(product.id),
      name: product.name,
    });
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (product) =>
        new Product({
          description: product.description,
          salesPrice: product.salesPrice,
          id: new Id(product.id),
          name: product.name,
        }),
    );
  }
}
