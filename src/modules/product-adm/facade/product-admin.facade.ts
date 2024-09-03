import {
  CheckStockFacadeOutputDto,
  CheckStockFacadeInputDto,
  AddProductFacadeInputDto,
} from './product-admin.facade.dto';
import ProductAdmFacadeInterface from './product-admin.facade.interface';
import UseCaseInterface from '../../@shared/usecase/use-case.interface';

export interface UseCasesProps {
  stockUseCase: UseCaseInterface;
  addUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _checkStockUsecase: UseCaseInterface;
  private _addUseCase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._addUseCase = usecasesProps.addUseCase;
    this._checkStockUsecase = usecasesProps.stockUseCase;
  }

  async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    const result = await this._checkStockUsecase.execute(input);
    return result as CheckStockFacadeOutputDto;
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    await this._addUseCase.execute(input);
  }
}
