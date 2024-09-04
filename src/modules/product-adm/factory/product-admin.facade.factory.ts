import AddProductUsecase from '../usecase/add-product/add-product.usecase';
import CheckStockUseCase from '../usecase/check-stock/check-stock.usecase';
import ProductRepository from '../repository/product.repository';
import ProductAdmFacade from '../facade/product-admin.facade';

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUsecase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);

    const productAdmFacade = new ProductAdmFacade({
      stockUseCase: checkStockUseCase,
      addUseCase: addProductUseCase,
    });

    return productAdmFacade;
  }
}
