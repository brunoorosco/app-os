import { ServiceOrderRepository } from '../repositories/ServiceOrderRepository';

interface FinalizeData {
  photos: string[];
  materials: { name: string; quantity: number }[];
  signature: string;
}

export class FinalizeServiceOrderUseCase {
  constructor(private repository: ServiceOrderRepository) {}

  async execute(orderId: string, data: FinalizeData): Promise<void> {
    return this.repository.finalize(orderId, data);
  }
}
