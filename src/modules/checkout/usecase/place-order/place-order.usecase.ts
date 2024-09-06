import StoreCatalogFacadeInterface from '../../../store-catalog/facade/store-catalog.facade.interface';
import ProductAdmFacadeInterface from '../../../product-adm/facade/product-admin.facade.interface';
import ClientAdmFacadeInterface from '../../../client-admin/facade/client-adm.facade.interface';
import PaymentFacadeInterface from '../../../payment/facade/payment.facade.interface';
import InvoiceFacadeInterface from '../../../invoice/facade/invoice.facade.interface';
import { PlaceOrderOutputDto, PlaceOrderInputDto } from './place-order.dto';
import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import Id from '../../../@shared/domain/value-object/id.value-object';
import CheckoutGateway from '../../gateway/checkout.gateway';
import Product from '../../domain/product.entity';
import Client from '../../domain/client.entity';
import Order from '../../domain/order.entity';

export default class PlaceOrderUsecase implements UseCaseInterface {
  private _catalogFacade: StoreCatalogFacadeInterface;
  private _productFacade: ProductAdmFacadeInterface;
  private _clientFacade: ClientAdmFacadeInterface;
  private _invoiceFacade: InvoiceFacadeInterface;
  private _paymentFacade: PaymentFacadeInterface;
  private _repository: CheckoutGateway;

  constructor(
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface,
    catalogFacade: StoreCatalogFacadeInterface,
    repository: CheckoutGateway,
    invoiceFacade: InvoiceFacadeInterface,
    paymentFacade: PaymentFacadeInterface,
  ) {
    this._clientFacade = clientFacade;
    this._productFacade = productFacade;
    this._catalogFacade = catalogFacade;
    this._repository = repository;
    this._invoiceFacade = invoiceFacade;
    this._paymentFacade = paymentFacade;
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this._catalogFacade.find({ id: productId });

    if (!product) {
      throw new Error('Product not found');
    }

    const productProps = {
      description: product.description,
      salesPrice: product.salesPrice,
      id: new Id(product.id),
      name: product.name,
    };
    return new Product(productProps);
  }

  private async checkStockForProducts(products: { productId: string }[]): Promise<void> {
    for (const p of products) {
      const product = await this._productFacade.checkStock({
        productId: p.productId,
      });

      if (product.stock <= 0) {
        throw new Error(`Product ${product.productId} is not available in stock`);
      }
    }
  }

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (input.products.length === 0) {
      throw new Error('No products selected');
    }

    await this.checkStockForProducts(input.products);
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientFacade.find({ id: input.clientId });

    if (!client) {
      throw new Error('Client not found');
    }

    await this.validateProducts(input);

    const products = await Promise.all(input.products.map((p) => this.getProduct(p.productId)));

    const myClient = new Client({
      address: client.address,
      id: new Id(client.id),
      email: client.email,
      name: client.name,
    });

    const order = new Order({
      client: myClient,
      products,
    });

    const payment = await this._paymentFacade.process({
      orderId: order.id.id,
      amount: order.total,
    });

    const invoice =
      payment.status === 'approved'
        ? await this._invoiceFacade.create({
            items: products.map((p) => {
              return {
                price: p.salesPrice,
                name: p.name,
                id: p.id.id,
              };
            }),
            address: client.address,
            name: client.name,
          })
        : null;

    payment.status === 'approved' && order.approved();
    this._repository.addOrder(order);

    return {
      products: order.products.map((p) => {
        return {
          productId: p.id.id,
        };
      }),
      invoiceId: payment.status === 'approved' ? invoice.id : null,
      status: order.status,
      total: order.total,
      id: order.id.id,
    };
  }
}
