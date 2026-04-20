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

    // Compute distance
    const withDistance = orders.map((order) => ({
      ...order,
      distance: calculateDistance(
        techLat,
        techLng,
        order.address.latitude,
        order.address.longitude,
      ),
    }));

    // Sorting Logic
    withDistance.sort((a, b) => {
      // 1. Status Priority
      const statusWeight = { in_progress: 0, pending: 1, completed: 2, cancelled: 3 };
      if (statusWeight[a.status] !== statusWeight[b.status]) {
        return statusWeight[a.status] - statusWeight[b.status];
      }

      // Only apply complex logic for active orders (in_progress, pending)
      if (a.status === 'in_progress' || a.status === 'pending') {
        const distA = a.distance ?? 0;
        const distB = b.distance ?? 0;
        const priorityWeight = { high: 0, medium: 1, low: 2 };

        // Check if both are within 1km
        if (distA < 1 && distB < 1) {
          // Priority is more important than distance
          if (priorityWeight[a.priority] !== priorityWeight[b.priority]) {
            return priorityWeight[a.priority] - priorityWeight[b.priority];
          }
          return distA - distB;
        }

        // Otherwise, distance is primary factor
        if (Math.abs(distA - distB) > 0.1) { // difference of more than 100m
          return distA - distB;
        }
        
        return priorityWeight[a.priority] - priorityWeight[b.priority];
      }

      return 0;
    });

    return withDistance;
  }

  async getById(id: string): Promise<ServiceOrder | undefined> {
    await delay(randomBetween(100, 300));
    return orders.find((order) => order.id === id);
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await delay(randomBetween(200, 400));

    const order = orders.find((o) => o.id === orderId);
    if (!order) throw new Error('Ordem não encontrada');

    // Rule: Cannot change completed or cancelled orders
    if (order.status === 'completed' || order.status === 'cancelled') {
      throw new Error('Esta ordem já foi finalizada ou cancelada e não pode ser alterada.');
    }

    // Rule: Only one order can be in progress
    if (status === 'in_progress') {
      const anyInProgress = orders.find((o) => o.status === 'in_progress');
      if (anyInProgress && anyInProgress.id !== orderId) {
        throw new Error('Já existe uma ordem em andamento. Finalize-a antes de iniciar outra.');
      }
      
      // Start time tracking
      if (!order.startTime) {
        order.startTime = new Date().toISOString();
      }
    }

    orders = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
  }

  async finalize(
    orderId: string,
    data: {
      photos: string[];
      materials: { name: string; quantity: number }[];
      signature: string;
      technicianComment?: string;
    },
  ): Promise<void> {
    await delay(randomBetween(500, 1000));

    const order = orders.find((o) => o.id === orderId);
    if (!order) throw new Error('Ordem não encontrada');

    orders = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status: 'completed',
            photos: data.photos,
            materials: data.materials,
            signature: data.signature,
            technicianComment: data.technicianComment,
            finishedAt: new Date().toISOString(),
            endTime: new Date().toISOString(), // End time tracking
          }
        : o,
    );
  }

  async updateComment(orderId: string, comment: string): Promise<void> {
    await delay(randomBetween(100, 200));
    orders = orders.map((o) => (o.id === orderId ? { ...o, technicianComment: comment } : o));
  }
}

// ── helpers ──────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
