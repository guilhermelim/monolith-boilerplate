import { Sequelize } from 'sequelize-typescript';

import ProductAdmFacadeFactory from '../factory/product-admin.facade.factory';
import ProductModel from '../repository/product.model';

describe('ProductAdmFacade test', () => {
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
    const productAdmFacade = ProductAdmFacadeFactory.create();

    const input = {
      description: 'Product 1 description',
      purchasePrice: 100,
      name: 'Product 1',
      stock: 10,
      id: '1',
    };

    await productAdmFacade.addProduct(input);

    const productRecord = await ProductModel.findOne({ where: { id: '1' } });
    const product = productRecord.toJSON();

    expect(product).toBeDefined();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.stock).toBe(input.stock);
  });

  it('should check product stock', async () => {
    const productAdmFacade = ProductAdmFacadeFactory.create();

    const input = {
      description: 'Product 1 description',
      purchasePrice: 100,
      name: 'Product 1',
      stock: 10,
      id: '1',
    };

    await productAdmFacade.addProduct(input);

    const result = await productAdmFacade.checkStock({ id: '1' });
    expect(result).toBeDefined();
    expect(result.id).toBe(input.id);
    expect(result.stock).toBe(input.stock);
  });
});
