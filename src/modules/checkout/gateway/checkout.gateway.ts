import Order from '../domain/order.entity';

export default interface CheckoutGateway {
  findOrder(id: string): Promise<Order | null>;
  addOrder(order: Order): Promise<void>;
}
