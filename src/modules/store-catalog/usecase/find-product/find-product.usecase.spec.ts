import Id from '../../../@shared/domain/value-object/id.value-object';
import FindProductUsecase from './find-product.usecase';
import Product from '../../domain/product.entity';

const product = new Product({
  description: 'Description 1',
  name: 'Product 1',
  id: new Id('1'),
  salesPrice: 100,
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};

describe('find a product usecase unit tests', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUsecase(productRepository);

    const input = { id: '1' };
    const result = await usecase.execute(input);

    expect(productRepository.find).toHaveBeenCalledWith('1');
    expect(result).toEqual({
      description: 'Description 1',
      name: 'Product 1',
      salesPrice: 100,
      id: '1',
    });
  });
});
