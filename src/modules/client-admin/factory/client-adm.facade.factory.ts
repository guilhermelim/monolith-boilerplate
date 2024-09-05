import FindClientUsecase from '../usecase/find-client/find-client.usecase';
import AddClientUsecase from '../usecase/add-client/add-client.usecase';
import ClientRepository from '../repository/client.repository';
import ClientAdmFacade from '../facade/client-adm.facade';

export default class ClientAdmFacadeFactory {
  static create() {
    const repository = new ClientRepository();
    const findUsecase = new FindClientUsecase(repository);
    const addUsecase = new AddClientUsecase(repository);

    const facade = new ClientAdmFacade({
      findUseCase: findUsecase,
      addUseCase: addUsecase,
    });

    return facade;
  }
}
