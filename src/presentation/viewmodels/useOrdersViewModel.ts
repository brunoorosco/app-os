import { ServiceOrderRepositoryImpl } from '@data/repositories/ServiceOrderRepositoryImpl';
import { mockTechnician } from '@data/datasources/mockServiceOrders';
import { OrderStatus, ServiceOrder } from '@domain/entities/ServiceOrder';
import { GetDailyOrdersUseCase } from '@domain/usecases/GetDailyOrdersUseCase';
import { UpdateOrderStatusUseCase } from '@domain/usecases/UpdateOrderStatusUseCase';
import { useCallback, useEffect, useMemo, useState } from 'react';

const repository = new ServiceOrderRepositoryImpl();
const getDailyOrders = new GetDailyOrdersUseCase(repository);
const updateOrderStatus = new UpdateOrderStatusUseCase(repository);

export interface OrderCounters {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export function useOrdersViewModel() {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const technician = mockTechnician;

  const fetchOrders = useCallback(async () => {
    try {
      const data = await getDailyOrders.execute(
        technician.id,
        technician.currentLatitude,
        technician.currentLongitude,
      );
      setOrders(data);
    } catch (error) {
      console.error('Erro ao buscar ordens:', error);
    }
  }, [technician]);

  const loadInitial = useCallback(async () => {
    setLoading(true);
    await fetchOrders();
    setLoading(false);
  }, [fetchOrders]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  }, [fetchOrders]);

  const changeStatus = useCallback(
    async (orderId: string, status: OrderStatus) => {
      await updateOrderStatus.execute(orderId, status);
      await fetchOrders();
    },
    [fetchOrders],
  );

  const counters: OrderCounters = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      inProgress: orders.filter((o) => o.status === 'in_progress').length,
      completed: orders.filter((o) => o.status === 'completed').length,
    };
  }, [orders]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return {
    orders,
    loading,
    refreshing,
    counters,
    technician,
    refresh,
    changeStatus,
  };
}
