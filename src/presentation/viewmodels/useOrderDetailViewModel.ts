import { ServiceOrderRepositoryImpl } from '@data/repositories/ServiceOrderRepositoryImpl';
import { Material, ServiceOrder } from '@domain/entities/ServiceOrder';
import { GetServiceOrderByIdUseCase } from '@domain/usecases/GetServiceOrderByIdUseCase';
import { FinalizeServiceOrderUseCase } from '@domain/usecases/FinalizeServiceOrderUseCase';
import { useCallback, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const repository = new ServiceOrderRepositoryImpl();
const getOrderById = new GetServiceOrderByIdUseCase(repository);
const finalizeOrder = new FinalizeServiceOrderUseCase(repository);

export function useOrderDetailViewModel(orderId: string) {
  const [order, setOrder] = useState<ServiceOrder | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [finalizing, setFinalizing] = useState(false);

  // Form states
  const [photos, setPhotos] = useState<string[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [signature, setSignature] = useState<string>('');

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    const data = await getOrderById.execute(orderId);
    if (data) {
      setOrder(data);
      // Only set from data if local state is empty to avoid overwriting new captures
      setPhotos((prev) => (prev.length === 0 ? data.photos || [] : prev));
      setMaterials((prev) => (prev.length === 0 ? data.materials || [] : prev));
      setSignature((prev) => (prev === '' ? data.signature || '' : prev));
    }
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const addPhoto = async () => {
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
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const addMaterial = (name: string, quantity: number) => {
    setMaterials((prev) => [...prev, { name, quantity }]);
  };

  const removeMaterial = (index: number) => {
    setMaterials((prev) => prev.filter((_, i) => i !== index));
  };

  const submitFinalization = async () => {
    if (!signature) {
      throw new Error('Assinatura é obrigatória');
    }
    setFinalizing(true);
    try {
      await finalizeOrder.execute(orderId, {
        photos,
        materials,
        signature,
      });
      await fetchOrder();
    } finally {
      setFinalizing(false);
    }
  };

  return {
    order,
    loading,
    finalizing,
    photos,
    materials,
    signature,
    setSignature,
    addPhoto,
    removePhoto,
    addMaterial,
    removeMaterial,
    submitFinalization,
  };
}
