import { FindClientFacadeOutputDto, FindClientFacadeInputDto, AddClientFacadeInputDto } from './client-adm.facade.dto';

export default interface ClientAdmFacadeInterface {
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
  add(input: AddClientFacadeInputDto): Promise<void>;
}
