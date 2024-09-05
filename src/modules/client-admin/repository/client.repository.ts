import Id from '../../@shared/domain/value-object/id.value-object';
import ClientGateway from '../gateway/client.gateway';
import Client from '../domain/client.entity';
import { ClientModel } from './client.model';

export default class ClientRepository implements ClientGateway {
  async find(id: string): Promise<Client> {
    const client = await ClientModel.findOne({ where: { id } });

    if (!client) {
      throw new Error('Client not found');
    }

    return new Client({
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      address: client.address,
      id: new Id(client.id),
      email: client.email,
      name: client.name,
    });
  }

  async add(client: Client): Promise<void> {
    await ClientModel.create({
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      address: client.address,
      email: client.email,
      name: client.name,
      id: client.id.id,
    });
  }
}
