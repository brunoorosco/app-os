import { Feather } from '@expo/vector-icons';
import { OrderPriority, ServiceOrder } from '@domain/entities/ServiceOrder';
import { Colors, FontFamily } from '@presentation/styles';
import { formatDistance, openInMaps } from '@shared/utils/geoUtils';
import { mockTechnician } from '@data/datasources/mockServiceOrders';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBadge } from '../StatusBadge';
import { useRouter } from 'expo-router';

const priorityConfig: Record<OrderPriority, { icon: string; color: string; bg: string; label: string }> = {
  high: { icon: '🔴', color: Colors.priority.high, bg: Colors.priority.highBg, label: 'Alta' },
  medium: { icon: '🟡', color: Colors.priority.medium, bg: Colors.priority.mediumBg, label: 'Média' },
  low: { icon: '🟢', color: Colors.priority.low, bg: Colors.priority.lowBg, label: 'Baixa' },
};

interface ServiceOrderCardProps {
  order: ServiceOrder;
  onPress?: (order: ServiceOrder) => void;
}

export function ServiceOrderCard({ order, onPress }: ServiceOrderCardProps) {
  const router = useRouter();
  const priority = priorityConfig[order.priority];

  const handlePress = () => {
    if (onPress) {
      onPress(order);
    } else {
      router.push(`/(app)/order/${order.id}`);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={styles.card}
    >
      {/* Top row: priority + status + distance */}
      <View style={styles.topRow}>
        <View style={styles.priorityBadge}>
          <Text style={styles.priorityIcon}>{priority.icon}</Text>
          <Text style={[styles.priorityLabel, { color: priority.color }]}>{priority.label}</Text>
        </View>
        <StatusBadge status={order.status} />
      </View>

      {/* Client info */}
      <View style={styles.clientRow}>
        <Text style={styles.clientName} numberOfLines={1}>
          {order.clientName}
        </Text>
        <Text style={styles.serviceType}>{order.serviceType}</Text>
      </View>

      {/* Address */}
      <TouchableOpacity 
        style={styles.infoRow}
        onPress={(e) => {
          e.stopPropagation();
          openInMaps(
            order.address.latitude,
            order.address.longitude,
            order.clientName
          );
        }}
      >
        <Feather name="map-pin" size={14} color={Colors.textSecondary} />
        <Text style={styles.addressText} numberOfLines={1}>
          {order.address.street}, {order.address.number} — {order.address.neighborhood}
        </Text>
      </TouchableOpacity>

      {/* Schedule + Distance grouped */}
      <View style={styles.bottomRow}>
        <View style={styles.infoRow}>
          <Feather name="clock" size={14} color={Colors.textSecondary} />
          <Text style={styles.infoText}>{order.scheduledTime}</Text>
        </View>

        {order.distance !== undefined && (
          <>
            <View style={styles.dotSeparator} />
            <View style={styles.infoRow}>
              <Feather name="navigation" size={14} color={Colors.textSecondary} />
              <Text style={styles.infoText}>{formatDistance(order.distance)}</Text>
            </View>
          </>
        )}
      </View>

      {/* Description preview */}
      <Text style={styles.description} numberOfLines={2}>
        {order.description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 10,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priorityIcon: {
    fontSize: 10,
  },
  priorityLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  clientRow: {
    gap: 2,
  },
  clientName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    fontFamily: FontFamily.inter.semibold,
  },
  serviceType: {
    fontSize: 14,
    color: Colors.main,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontFamily: FontFamily.inter.regular,
  },
  addressText: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
    fontFamily: FontFamily.inter.regular,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
