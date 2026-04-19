import { OrderStatus } from '../entities/ServiceOrder';
import { ServiceOrderRepository } from '../repositories/ServiceOrderRepository';

export class UpdateOrderStatusUseCase {
  constructor(private repository: ServiceOrderRepository) {}

  async execute(orderId: string, status: OrderStatus): Promise<void> {
    return this.repository.updateOrderStatus(orderId, status);
  }
}
