import { Sequelize } from 'sequelize-typescript';

import StoreCatalogFacadeFactory from '../factory/store-catalog.facade.factory';
import ProductModel from '../repository/product.model';

describe('store catalog facade unit test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      sync: { force: true },
      storage: ':memory:',
      dialect: 'sqlite',
      logging: false,
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a product', async () => {
    const facade = StoreCatalogFacadeFactory.create();

    await ProductModel.create({
      description: 'Product 1 description',
      name: 'Product 1',
      salesPrice: 100,
      id: '1',
    });

    const result = await facade.find({ id: '1' });

    expect(result.id).toBe('1');
    expect(result.name).toBe('Product 1');
    expect(result.description).toBe('Product 1 description');
    expect(result.salesPrice).toBe(100);
  });

  it('should find all products', async () => {
    const facade = StoreCatalogFacadeFactory.create();

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

    const result = await facade.findAll();

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe('1');
    expect(result.products[0].name).toBe('Product 1');
    expect(result.products[0].description).toBe('Product 1 description');
    expect(result.products[0].salesPrice).toBe(100);
    expect(result.products[1].id).toBe('2');
    expect(result.products[1].name).toBe('Product 2');
    expect(result.products[1].description).toBe('Product 2 description');
    expect(result.products[1].salesPrice).toBe(200);
  });
});
