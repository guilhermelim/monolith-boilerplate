import FindAllProductsUsecase from '../usecase/find-all-products/find-all-products.usecase';
import FindProductUsecase from '../usecase/find-product/find-product.usecase';
import ProductRepository from '../repository/product.repository';
import StoreCatalogFacade from '../facade/store-catalog.facade';

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findAllUseCase = new FindAllProductsUsecase(productRepository);
    const findUseCase = new FindProductUsecase(productRepository);

    const facade = new StoreCatalogFacade({
      findAllUseCase: findAllUseCase,
      findUseCase: findUseCase,
    });

    return facade;
  }
}
