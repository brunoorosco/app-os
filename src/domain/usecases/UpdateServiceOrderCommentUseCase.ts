import { ServiceOrderRepository } from '../repositories/ServiceOrderRepository';

export class UpdateServiceOrderCommentUseCase {
  constructor(private repository: ServiceOrderRepository) {}

  async execute(orderId: string, comment: string): Promise<void> {
    return this.repository.updateComment(orderId, comment);
  }
}
