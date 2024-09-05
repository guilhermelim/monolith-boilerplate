import { FindClientOutputDto, FindClientInputDto } from './find-client.usecase.dto';
import ClientGateway from '../../gateway/client.gateway';

export default class FindClientUsecase {
  constructor(private _clientRepository: ClientGateway) {}

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this._clientRepository.find(input.id);

    return {
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      address: client.address,
      email: client.email,
      name: client.name,
      id: client.id.id,
    };
  }
}
