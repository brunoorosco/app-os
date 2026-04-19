import { ServiceOrder } from '../entities/ServiceOrder';
import { ServiceOrderRepository } from '../repositories/ServiceOrderRepository';

export class GetDailyOrdersUseCase {
  constructor(private repository: ServiceOrderRepository) {}

  async execute(
    technicianId: string,
    techLat: number,
    techLng: number,
  ): Promise<ServiceOrder[]> {
    return this.repository.getDailyOrders(technicianId, techLat, techLng);
  }
}
