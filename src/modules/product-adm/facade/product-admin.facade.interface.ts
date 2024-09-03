import {
  CheckStockFacadeOutputDto,
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
} from './product-admin.facade.dto';

export default interface ProductAdmFacadeInterface {
  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;
  addProduct(input: AddProductFacadeInputDto): Promise<void>;
}
