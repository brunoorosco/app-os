import { OrderStatus, ServiceOrder } from '@domain/entities/ServiceOrder';
import { ServiceOrderRepository } from '@domain/repositories/ServiceOrderRepository';
import { calculateDistance } from '@shared/utils/geoUtils';
import { mockServiceOrders } from '../datasources/mockServiceOrders';

/** In-memory copy so status mutations persist during the session */
let orders = [...mockServiceOrders];

export class ServiceOrderRepositoryImpl implements ServiceOrderRepository {
  async getDailyOrders(
    _technicianId: string,
    techLat: number,
    techLng: number,
  ): Promise<ServiceOrder[]> {
    // Simulate network delay
    await delay(randomBetween(300, 600));

    // Compute distance and sort by proximity
    const withDistance = orders.map((order) => ({
      ...order,
      distance: calculateDistance(
        techLat,
        techLng,
        order.address.latitude,
        order.address.longitude,
      ),
    }));

    withDistance.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

    return withDistance;
  }

  async getById(id: string): Promise<ServiceOrder | undefined> {
    await delay(randomBetween(100, 300));
    return orders.find((order) => order.id === id);
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await delay(randomBetween(200, 400));

    orders = orders.map((order) => (order.id === orderId ? { ...order, status } : order));
  }

  async finalize(
    orderId: string,
    data: {
      photos: string[];
      materials: { name: string; quantity: number }[];
      signature: string;
    },
  ): Promise<void> {
    await delay(randomBetween(500, 1000));

    orders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: 'completed',
            photos: data.photos,
            materials: data.materials,
            signature: data.signature,
            finishedAt: new Date().toISOString(),
          }
        : order,
    );
  }
}

// ── helpers ──────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
