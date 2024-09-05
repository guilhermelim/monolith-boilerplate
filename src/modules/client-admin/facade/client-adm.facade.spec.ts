import { Sequelize } from 'sequelize-typescript';

import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory';
import AddClientUsecase from '../usecase/add-client/add-client.usecase';
import ClientRepository from '../repository/client.repository';
import { ClientModel } from '../repository/client.model';
import ClientAdmFacade from './client-adm.facade';

describe('client adm facade test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      sync: { force: true },
      storage: ':memory:',
      dialect: 'sqlite',
      logging: false,
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a client', async () => {
    const repository = new ClientRepository();
    const addUseCase = new AddClientUsecase(repository);
    const facade = new ClientAdmFacade({
      addUseCase: addUseCase,
      findUseCase: undefined,
    });

    const input = {
      email: 'john@example.com',
      address: '123 Main St',
      name: 'client 1',
      id: '1',
    };
    await facade.add(input);

    const client = await ClientModel.findOne({ where: { id: input.id } });

    expect(client).toBeDefined();
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
  });

  it('should find a client', async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      email: 'john@example.com',
      address: '123 Main St',
      name: 'client 1',
      id: '1',
    };

    await facade.add(input);

    const client = await facade.find({ id: input.id });

    expect(client).toBeDefined();
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
  });
});
