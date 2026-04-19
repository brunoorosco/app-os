import { ServiceOrder } from '../entities/ServiceOrder';
import { ServiceOrderRepository } from '../repositories/ServiceOrderRepository';

export class GetServiceOrderByIdUseCase {
  constructor(private repository: ServiceOrderRepository) {}

  async execute(id: string): Promise<ServiceOrder | undefined> {
    return this.repository.getById(id);
  }
}
