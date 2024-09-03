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
      purchasePrice: product.purchasePrice,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      id: new Id(product.id),
      stock: product.stock,
      name: product.name,
    });
  }

  async add(product: Product): Promise<void> {
    await ProductModel.create({
      purchasePrice: product.purchasePrice,
      description: product.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      stock: product.stock,
      name: product.name,
      id: product.id.id,
    });
  }
}
