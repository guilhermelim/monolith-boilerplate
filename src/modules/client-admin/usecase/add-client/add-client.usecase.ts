import { AddClientOutputDto, AddClientInputDto } from './add-client.usecase.dto';
import Id from '../../../@shared/domain/value-object/id.value-object';
import ClientGateway from '../../gateway/client.gateway';
import Client from '../../domain/client.entity';

export default class AddClientUsecase {
  constructor(private _clientRepository: ClientGateway) {}

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      address: input.address,
      id: new Id(input.id),
      email: input.email,
      name: input.name,
    };

    const client = new Client(props);
    this._clientRepository.add(client);

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
