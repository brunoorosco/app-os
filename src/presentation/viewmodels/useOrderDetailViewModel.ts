import { ServiceOrderRepositoryImpl } from '@data/repositories/ServiceOrderRepositoryImpl';
import { Material, ServiceOrder } from '@domain/entities/ServiceOrder';
import { GetServiceOrderByIdUseCase } from '@domain/usecases/GetServiceOrderByIdUseCase';
import { FinalizeServiceOrderUseCase } from '@domain/usecases/FinalizeServiceOrderUseCase';
import { UpdateOrderStatusUseCase } from '@domain/usecases/UpdateOrderStatusUseCase';
import { useCallback, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const repository = new ServiceOrderRepositoryImpl();
const getOrderById = new GetServiceOrderByIdUseCase(repository);
const finalizeOrder = new FinalizeServiceOrderUseCase(repository);
const updateOrderStatus = new UpdateOrderStatusUseCase(repository);

export function useOrderDetailViewModel(orderId: string) {
  const [order, setOrder] = useState<ServiceOrder | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [finalizing, setFinalizing] = useState(false);

  // Form states
  const [photos, setPhotos] = useState<string[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [signature, setSignature] = useState<string>('');
  const [technicianComment, setTechnicianComment] = useState<string>('');

  const isBlocked = order?.status === 'completed' || order?.status === 'cancelled';

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    const data = await getOrderById.execute(orderId);
    if (data) {
      setOrder(data);
      // Only set from data if local state is empty to avoid overwriting new captures
      setPhotos((prev) => (prev.length === 0 ? data.photos || [] : prev));
      setMaterials((prev) => (prev.length === 0 ? data.materials || [] : prev));
      setSignature((prev) => (prev === '' ? data.signature || '' : prev));
      setTechnicianComment((prev) => (prev === '' ? data.technicianComment || '' : prev));
    }
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const addPhoto = async () => {
    if (isBlocked) return;
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotos((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const removePhoto = (index: number) => {
    if (isBlocked) return;
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const addMaterial = (name: string, quantity: number) => {
    if (isBlocked) return;
    setMaterials((prev) => [...prev, { name, quantity }]);
  };

  const removeMaterial = (index: number) => {
    if (isBlocked) return;
    setMaterials((prev) => prev.filter((_, i) => i !== index));
  };

  const submitFinalization = async () => {
    if (isBlocked) throw new Error('Esta ordem não pode ser alterada.');
    if (!signature) {
      throw new Error('Assinatura é obrigatória');
    }
    setFinalizing(true);
    try {
      await finalizeOrder.execute(orderId, {
        photos,
        materials,
        signature,
        technicianComment,
      });
      await fetchOrder();
    } finally {
      setFinalizing(false);
    }
  };

  const submitComment = async () => {
    if (order?.status !== 'pending') throw new Error('Comentários só podem ser adicionados em ordens pendentes.');
    await repository.updateComment(orderId, technicianComment);
    await fetchOrder();
  };

  const cancelOrder = async () => {
    if (isBlocked) throw new Error('Esta ordem não pode ser alterada.');
    await repository.updateOrderStatus(orderId, 'cancelled');
    await fetchOrder();
  };

  const startOrder = async () => {
    if (isBlocked) throw new Error('Esta ordem não pode ser alterada.');
    await updateOrderStatus.execute(orderId, 'in_progress');
    await fetchOrder();
  };

  return {
    order,
    loading,
    finalizing,
    photos,
    materials,
    signature,
    setSignature,
    technicianComment,
    setTechnicianComment,
    addPhoto,
    removePhoto,
    addMaterial,
    removeMaterial,
    submitFinalization,
    submitComment,
    cancelOrder,
    startOrder,
    isBlocked,
  };
}
