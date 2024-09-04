import {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
} from './store-catalog.facade.dto';

export default interface StoreCatalogFacadeInterface {
  find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}
