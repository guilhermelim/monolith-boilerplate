import Id from '../../@shared/domain/value-object/id.value-object';
import Invoice from './invoice.entity';
import Product from './product.entity';

describe('Invoice unit test', () => {
  it('should calculate the invoice total', () => {
    const invoice = new Invoice({
      items: [
        new Product({
          name: 'Product 1',
          id: new Id('1'),
          price: 10,
        }),
        new Product({
          name: 'Product 2',
          id: new Id('2'),
          price: 20,
        }),
      ],
      address: '123 Main St',
      name: 'Customer Test',
      id: new Id('1'),
    });

    expect(invoice.total).toBe(30);
  });

  it('should add a product to the invoice', () => {
    const product1 = new Product({
      name: 'Product 1',
      id: new Id('1'),
      price: 10,
    });

    const invoice = new Invoice({
      address: '123 Main St',
      name: 'Customer Test',
      items: [product1],
      id: new Id('1'),
    });

    const product2 = new Product({
      name: 'Product 2',
      id: new Id('2'),
      price: 20,
    });

    invoice.add(product2);

    expect(invoice.items.length).toBe(2);
    expect(invoice.total).toBe(30);
  });

  it('should return the correct invoice address', () => {
    const invoice = new Invoice({
      address: '123 Main St',
      name: 'Customer Test',
      id: new Id('1'),
      items: [],
    });

    expect(invoice.address).toBe('123 Main St');
  });

  it('should return the correct invoice name', () => {
    const invoice = new Invoice({
      address: '123 Main St',
      name: 'Customer Test',
      id: new Id('1'),
      items: [],
    });

    expect(invoice.name).toBe('Customer Test');
  });

  it('should create an invoice with the provided properties', () => {
    const product1 = new Product({
      name: 'Product 1',
      id: new Id('1'),
      price: 10,
    });

    const invoice = new Invoice({
      address: '123 Main St',
      name: 'Customer Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [product1],
      id: new Id('1'),
    });

    expect(invoice.items).toHaveLength(1);
    expect(invoice.address).toBe('123 Main St');
    expect(invoice.name).toBe('Customer Test');
  });
});
