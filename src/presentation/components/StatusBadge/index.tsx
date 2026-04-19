import { Colors } from '@presentation/styles';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrderStatus } from '@domain/entities/ServiceOrder';

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pendente', color: Colors.status.pending, bg: Colors.status.pendingBg },
  in_progress: {
    label: 'Em andamento',
    color: Colors.status.in_progress,
    bg: Colors.status.in_progressBg,
  },
  completed: {
    label: 'Finalizada',
    color: Colors.status.completed,
    bg: Colors.status.completedBg,
  },
};

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
