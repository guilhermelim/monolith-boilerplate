import ValueObject from '../../@shared/domain/value-object/value-object.interface';
import Id from '../../@shared/domain/value-object/id.value-object';

export default class TransactionId extends Id implements ValueObject {
  constructor(id?: string) {
    super(id);
  }
}
