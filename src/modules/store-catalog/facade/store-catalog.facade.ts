import {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
} from './store-catalog.facade.dto';
import FindAllProductsUsecase from '../usecase/find-all-products/find-all-products.usecase';
import FindProductUsecase from '../usecase/find-product/find-product.usecase';
import StoreCatalogFacadeInterface from './store-catalog.facade.interface';

export interface UseCaseProps {
  findAllUseCase: FindAllProductsUsecase;
  findUseCase: FindProductUsecase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findAllUseCase: FindAllProductsUsecase;
  private _findUseCase: FindProductUsecase;

  constructor(private props: UseCaseProps) {
    this._findUseCase = props.findUseCase;
    this._findAllUseCase = props.findAllUseCase;
  }

  async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    const product = await this._findUseCase.execute(id);
    return product;
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return await this._findAllUseCase.execute();
  }
}
