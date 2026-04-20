import { OrderStatus, ServiceOrder } from '../entities/ServiceOrder';

export interface ServiceOrderRepository {
  getDailyOrders(
    technicianId: string,
    techLat: number,
    techLng: number,
  ): Promise<ServiceOrder[]>;

  getById(id: string): Promise<ServiceOrder | undefined>;

  updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>;

  finalize(
    orderId: string,
    data: {
      photos: string[];
      materials: { name: string; quantity: number }[];
      signature: string;
      technicianComment?: string;
    },
  ): Promise<void>;

  updateComment(orderId: string, comment: string): Promise<void>;
}
