import AddProductUseCase from './add-product.usecase';

const MockRepository = () => {
  return {
    find: jest.fn(),
    add: jest.fn(),
  };
};

describe('Add Product usecase unit test', () => {
  it('should add a product', async () => {
    // repositorio
    // usecase
    const productRepository = MockRepository();
    const usecase = new AddProductUseCase(productRepository);

    const input = {
      description: 'Product 1 description',
      purchasePrice: 100,
      name: 'Product 1',
      stock: 10,
    };

    const result = await usecase.execute(input);

    expect(productRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
  });
});
