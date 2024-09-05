import AddClientUsecase from './add-client.usecase';

const MockRepository = () => {
  return {
    find: jest.fn(),
    add: jest.fn(),
  };
};

describe('add client usecase unit test', () => {
  it('should add a client', async () => {
    const repository = MockRepository();
    const usecase = new AddClientUsecase(repository);
    const input = {
      email: 'john@email.com',
      address: '123 Main St',
      name: 'John Doe',
      id: '1',
    };
    const result = await usecase.execute(input);
    expect(repository.add).toHaveBeenCalled();

    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.address).toBe(input.address);
  });
});
