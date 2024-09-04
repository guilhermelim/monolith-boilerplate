import Id from '../../../@shared/domain/value-object/id.value-object';
import CheckStockUseCase from './check-stock.usecase';
import Product from '../../domain/product.entity';

const product = new Product({
  description: 'product description',
  purchasePrice: 100,
  name: 'Product 1',
  id: new Id('1'),
  stock: 10,
});

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(Promise.resolve(product)),
    add: jest.fn(),
  };
};

describe('CheckStock usecase unit test', () => {
  it('should get stock of a product', async () => {
    const productRepository = MockRepository();
    const checkStockUseCase = new CheckStockUseCase(productRepository);

    const input = {
      id: '1',
    };

    const result = await checkStockUseCase.execute(input);

    expect(productRepository.find).toHaveBeenCalled();
    expect(result.id).toBe('1');
    expect(result.stock).toBe(10);
  });
});
