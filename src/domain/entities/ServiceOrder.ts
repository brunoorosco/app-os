export type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type OrderPriority = 'low' | 'medium' | 'high';

export interface Address {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

export interface Material {
  name: string;
  quantity: number;
}

export interface ServiceOrder {
  id: string;
  clientName: string;
  clientPhone: string;
  address: Address;
  serviceType: string;
  priority: OrderPriority;
  status: OrderStatus;
  scheduledTime: string;
  description: string;
  notes?: string;
  /** Distance in km from technician — computed at runtime */
  distance?: number;
  // Finalization fields
  photos?: string[];
  materials?: Material[];
  signature?: string;
  finishedAt?: string;
  // Internal tracking
  technicianComment?: string;
  startTime?: string;
  endTime?: string;
}
