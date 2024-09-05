import Id from '../../../@shared/domain/value-object/id.value-object';
import FindClientUsecase from './find-client.usecase';
import Client from '../../domain/client.entity';

const client = new Client({
  email: 'john@email.com',
  address: '123 Main St',
  name: 'John Doe',
  id: new Id('1'),
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
    add: jest.fn(),
  };
};

describe('find client usecase unit test', () => {
  it('should find a client', async () => {
    const repository = MockRepository();
    const usecase = new FindClientUsecase(repository);

    const input = { id: '1' };
    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBe(client.id.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.address).toBe(client.address);
  });
});
