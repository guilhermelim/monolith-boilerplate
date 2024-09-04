import { Sequelize } from 'sequelize-typescript';

import ProductRepository from './product.repository';
import ProductModel from './product.model';

describe('product repository unit test', () => {
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

  it('should find all products', async () => {
    await ProductModel.create({
      description: 'Product 1 description',
      name: 'Product 1',
      salesPrice: 100,
      id: '1',
    });

    await ProductModel.create({
      description: 'Product 2 description',
      name: 'Product 2',
      salesPrice: 200,
      id: '2',
    });

    const productRepository = new ProductRepository();
    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id.id).toEqual('1');
    expect(products[0].name).toEqual('Product 1');
    expect(products[0].description).toEqual('Product 1 description');
    expect(products[0].salesPrice).toEqual(100);
    expect(products[1].id.id).toEqual('2');
    expect(products[1].name).toEqual('Product 2');
    expect(products[1].description).toEqual('Product 2 description');
    expect(products[1].salesPrice).toEqual(200);
  });

  it('should find a product', async () => {
    await ProductModel.create({
      description: 'Product 1 description',
      name: 'Product 1',
      salesPrice: 100,
      id: '1',
    });

    const productRepository = new ProductRepository();
    const product = await productRepository.find('1');

    expect(product.id.id).toEqual('1');
    expect(product.name).toEqual('Product 1');
    expect(product.description).toEqual('Product 1 description');
    expect(product.salesPrice).toEqual(100);
  });

  it('should throw error when product with given id is not found', async () => {
    const productRepository = new ProductRepository();
    const invalidId = 'non-existing-id';

    await expect(productRepository.find(invalidId)).rejects.toThrow(`Product with id ${invalidId} not found`);
  });
});
