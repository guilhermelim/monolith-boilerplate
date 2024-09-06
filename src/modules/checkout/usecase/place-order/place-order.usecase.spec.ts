import Id from '../../../@shared/domain/value-object/id.value-object';
import { PlaceOrderInputDto } from './place-order.dto';
import PlaceOrderUsecase from './place-order.usecase';
import Product from '../../domain/product.entity';

describe('PlaceOrderUsecase unit test', () => {
  describe('validateProducts method', () => {
    //@ts-expect-error - no params in constructor
    const placeOrderUsecase = new PlaceOrderUsecase();

    it('should throw error if no products are selected', async () => {
      const input: PlaceOrderInputDto = {
        clientId: '0',
        products: [],
      };

      await expect(placeOrderUsecase['validateProducts'](input)).rejects.toThrow(new Error('No products selected'));
    });

    it('should throw an error when product is out of stock', async () => {
      const mockProductFacade = {
        checkStock: jest.fn(({ productId }: { productId: string }) =>
          Promise.resolve({
            stock: productId === '1' ? 0 : 1,
            productId,
          }),
        ),
      };

      //@ts-expect-error - force set productFacade
      placeOrderUsecase['_productFacade'] = mockProductFacade;

      let input: PlaceOrderInputDto = {
        products: [{ productId: '1' }],
        clientId: '0',
      };

      await expect(placeOrderUsecase['validateProducts'](input)).rejects.toThrow(
        new Error('Product 1 is not available in stock'),
      );

      input = {
        products: [{ productId: '0' }, { productId: '1' }],
        clientId: '0',
      };

      await expect(placeOrderUsecase['validateProducts'](input)).rejects.toThrow(
        new Error('Product 1 is not available in stock'),
      );
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

      input = {
        products: [{ productId: '0' }, { productId: '1' }, { productId: '2' }],
        clientId: '0',
      };

      await expect(placeOrderUsecase['validateProducts'](input)).rejects.toThrow(
        new Error('Product 1 is not available in stock'),
      );
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);
    });
  });

  describe('getProducts method', () => {
    const mockDate = new Date(2000, 1, 1);

    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    //@ts-expect-error - no params in constructor
    const placeOrderUsecase = new PlaceOrderUsecase();

    it('should throw an error when product not found', async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      //@ts-expect-error - force set catalogFacade
      placeOrderUsecase['_catalogFacade'] = mockCatalogFacade;

      await expect(placeOrderUsecase['getProduct']('0')).rejects.toThrow(new Error('Product not found'));
    });

    it('should return a product', async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue({
          description: 'Product 0 description',
          name: 'Product 0',
          salesPrice: 0,
          id: '0',
        }),
      };

      //@ts-expect-error - force set catalogFacade
      placeOrderUsecase['_catalogFacade'] = mockCatalogFacade;

      await expect(placeOrderUsecase['getProduct']('0')).resolves.toEqual(
        new Product({
          description: 'Product 0 description',
          name: 'Product 0',
          id: new Id('0'),
          salesPrice: 0,
        }),
      );
      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('execute method', () => {
    const mockDate = new Date(2000, 1, 1);

    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should throw an error when client not found', async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      //@ts-expect-error - no params in constructor
      const placeOrderUsecase = new PlaceOrderUsecase();
      //@ts-expect-error - force set _clientFacade
      placeOrderUsecase['_clientFacade'] = mockClientFacade;

      const input: PlaceOrderInputDto = { clientId: '0', products: [] };

      await expect(placeOrderUsecase.execute(input)).rejects.toThrow(new Error('Client not found'));
    });

    it('should throw an error when products are not valid', async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
      };

      //@ts-expect-error - no params in constructor
      const placeOrderUsecase = new PlaceOrderUsecase();

      const mockValidateProducts = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUsecase, 'validateProducts')
        // @ts-expect-error - not return never
        .mockRejectedValue(new Error('No products selected'));

      //@ts-expect-error - force set clientFacade
      placeOrderUsecase['_clientFacade'] = mockClientFacade;

      const input: PlaceOrderInputDto = { clientId: '1', products: [] };
      await expect(placeOrderUsecase.execute(input)).rejects.toThrow(new Error('No products selected'));
      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
    });

    describe('place an order', () => {
      const clientProps = {
        email: 'john@example.com',
        address: '123 Main St',
        name: 'Client 0',
        id: '1c',
      };

      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(clientProps),
        add: jest.fn(),
      };

      const mockPaymentFacade = {
        process: jest.fn(),
      };

      const mockCheckoutRepo = {
        addOrder: jest.fn(),
      };

      const mockInvoiceFacade = {
        create: jest.fn().mockResolvedValue({ id: '1i' }),
      };

      const placeOrderUsecase = new PlaceOrderUsecase(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockClientFacade as any,
        null,
        null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockCheckoutRepo as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockInvoiceFacade as any,
        mockPaymentFacade,
      );

      const products = {
        '1': new Product({
          description: 'some description',
          name: 'Product 1',
          id: new Id('1'),
          salesPrice: 40,
        }),
        '2': new Product({
          description: 'some description',
          name: `Product 2`,
          id: new Id('2'),
          salesPrice: 30,
        }),
      };

      const mockValidateProducts = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUsecase, 'validateProducts')
        //@ts-expect-error - spy on private method
        .mockResolvedValue(null);

      const mockGetProduct = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUsecase, 'getProduct')
        //@ts-expect-error - spy on private method
        .mockImplementation((productId: keyof typeof products) => {
          return products[productId];
        });

      it('should not be approved', async () => {
        mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
          createdAt: new Date(),
          updatedAt: new Date(),
          transactionId: '1t',
          status: 'error',
          orderId: '1o',
          amount: 100,
        });

        const input: PlaceOrderInputDto = {
          products: [{ productId: '1' }, { productId: '2' }],
          clientId: '1c',
        };

        const output = await placeOrderUsecase.execute(input);

        expect(output.invoiceId).toBeNull();
        expect(output.total).toBe(70);
        expect(output.products).toStrictEqual([{ productId: '1' }, { productId: '2' }]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: '1c' });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockValidateProducts).toHaveBeenCalledWith(input);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({
          amount: output.total,
          orderId: output.id,
        });

        expect(mockInvoiceFacade.create).toHaveBeenCalledTimes(0);
      });

      it('should be approved', async () => {
        mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
          createdAt: new Date(),
          updatedAt: new Date(),
          transactionId: '1t',
          status: 'approved',
          orderId: '1o',
          amount: 100,
        });

        const input: PlaceOrderInputDto = {
          products: [{ productId: '1' }, { productId: '2' }],
          clientId: '1c',
        };

        const output = await placeOrderUsecase.execute(input);

        expect(output.invoiceId).toBe('1i');
        expect(output.total).toBe(70);
        expect(output.products).toStrictEqual([{ productId: '1' }, { productId: '2' }]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: '1c' });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({
          amount: output.total,
          orderId: output.id,
        });
        expect(mockInvoiceFacade.create).toHaveBeenCalledTimes(1);
        expect(mockInvoiceFacade.create).toHaveBeenCalledWith({
          items: [
            {
              price: products['1'].salesPrice,
              name: products['1'].name,
              id: products['1'].id.id,
            },
            {
              price: products['2'].salesPrice,
              name: products['2'].name,
              id: products['2'].id.id,
            },
          ],
          address: clientProps.address,
          name: clientProps.name,
        });
      });
    });
  });
});
