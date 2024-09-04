import Id from '../../../@shared/domain/value-object/id.value-object';
import FindAllProductsUsecase from './find-all-products.usecase';
import Product from '../../domain/product.entity';

const product = new Product({
  description: 'Description 1',
  name: 'Product 1',
  id: new Id('1'),
  salesPrice: 100,
});

const product2 = new Product({
  description: 'Description 2',
  name: 'Product 2',
  id: new Id('2'),
  salesPrice: 200,
});

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    find: jest.fn(),
  };
};

describe('find all products usecase unit tests', () => {
  it('should find all products', async () => {
    const productRepository = MockRepository();
    const usecase = new FindAllProductsUsecase(productRepository);

    const result = await usecase.execute();

    expect(productRepository.findAll).toHaveBeenCalled();
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe('1');
    expect(result.products[0].name).toBe('Product 1');
    expect(result.products[0].description).toBe('Description 1');
    expect(result.products[0].salesPrice).toBe(100);
    expect(result.products[1].id).toBe('2');
    expect(result.products[1].name).toBe('Product 2');
    expect(result.products[1].description).toBe('Description 2');
    expect(result.products[1].salesPrice).toBe(200);
  });
});
