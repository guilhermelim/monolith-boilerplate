import { Sequelize } from 'sequelize-typescript';

import Id from '../../@shared/domain/value-object/id.value-object';
import ProductRepository from './product.repository';
import Product from '../domain/product.entity';
import ProductModel from './product.model';

describe('ProductRepository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      sync: { force: true },
      storage: ':memory:',
      dialect: 'sqlite',
      logging: false,
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productProps = {
      description: 'Product 1 description',
      purchasePrice: 100,
      name: 'Product 1',
      id: new Id('1'),
      stock: 10,
    };
    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: { id: productProps.id.id },
    });

    expect(productProps.id.id).toEqual(productDb.toJSON().id);
    expect(productProps.name).toEqual(productDb.toJSON().name);
    expect(productProps.description).toEqual(productDb.toJSON().description);
    expect(productProps.purchasePrice).toEqual(productDb.toJSON().purchasePrice);
    expect(productProps.stock).toEqual(productDb.toJSON().stock);
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();

    ProductModel.create({
      description: 'Product 1 description',
      createdAt: new Date(),
      updatedAt: new Date(),
      purchasePrice: 100,
      name: 'Product 1',
      stock: 10,
      id: '1',
    });

    const product = await productRepository.find('1');

    expect(product.id.id).toEqual('1');
    expect(product.name).toEqual('Product 1');
    expect(product.description).toEqual('Product 1 description');
    expect(product.purchasePrice).toEqual(100);
    expect(product.stock).toEqual(10);
  });

  it('should throw error when product with given id is not found', async () => {
    const productRepository = new ProductRepository();
    const invalidId = 'non-existing-id';

    await expect(productRepository.find(invalidId)).rejects.toThrow(`Product with id ${invalidId} not found`);
  });
});
