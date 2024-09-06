import Id from '../../@shared/domain/value-object/id.value-object';
import Product from './product.entity';

describe('Product unit test', () => {
  it('should create a product with the provided properties', () => {
    const product = new Product({
      name: 'Product 1',
      id: new Id('1'),
      price: 100,
    });

    expect(product.id.id).toBe('1');
    expect(product.name).toBe('Product 1');
    expect(product.price).toBe(100);
  });

  it('should create a product without an id', () => {
    const product = new Product({
      name: 'Product 2',
      price: 50,
    });

    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product 2');
    expect(product.price).toBe(50);
  });

  it('should return the correct product name', () => {
    const product = new Product({
      name: 'Product 3',
      id: new Id('1'),
      price: 75,
    });

    expect(product.name).toBe('Product 3');
  });

  it('should return the correct product price', () => {
    const product = new Product({
      name: 'Product 4',
      id: new Id('1'),
      price: 200,
    });

    expect(product.price).toBe(200);
  });
});
