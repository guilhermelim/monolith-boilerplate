import { FindClientFacadeOutputDto, FindClientFacadeInputDto, AddClientFacadeInputDto } from './client-adm.facade.dto';
import UseCaseInterface from '../../@shared/usecase/use-case.interface';
import ClientAdmFacadeInterface from './client-adm.facade.interface';

export interface UseCasesProps {
  findUseCase: UseCaseInterface;
  addUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _addUseCase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._findUseCase = usecasesProps.findUseCase;
    this._addUseCase = usecasesProps.addUseCase;
  }

  async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    const result = await this._findUseCase.execute(input);
    return result as FindClientFacadeOutputDto;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUseCase.execute(input);
  }
}
