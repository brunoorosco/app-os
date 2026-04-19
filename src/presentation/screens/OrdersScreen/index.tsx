import { Feather } from '@expo/vector-icons';
import { ServiceOrder } from '@domain/entities/ServiceOrder';
import { ServiceOrderCard } from '@presentation/components/ServiceOrderCard';
import { Colors, FontFamily } from '@presentation/styles';
import { useOrdersViewModel, OrderCounters } from '@presentation/viewmodels/useOrdersViewModel';
import { getGreeting, formatDateBR } from '@shared/utils/dateUtils';
import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function OrdersScreen() {
  const { orders, loading, refreshing, counters, technician, refresh } = useOrdersViewModel();

  const renderItem = useCallback(
    ({ item }: { item: ServiceOrder }) => <ServiceOrderCard order={item} />,
    [],
  );

  const keyExtractor = useCallback((item: ServiceOrder) => item.id, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.main} />
        <Text style={styles.loadingText}>Carregando ordens...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ListHeader
            technicianName={technician.name}
            counters={counters}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={Colors.main}
            colors={[Colors.main]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color={Colors.textSecondary} />
            <Text style={styles.emptyText}>Nenhuma ordem de serviço para hoje</Text>
          </View>
        }
      />
    </View>
  );
}

// ── Header Component ─────────────────────────────────

function ListHeader({
  technicianName,
  counters,
}: {
  technicianName: string;
  counters: OrderCounters;
}) {
  const firstName = technicianName.split(' ')[0];

  return (
    <View style={styles.headerWrapper}>
      {/* Gradient Header */}
      <LinearGradient
        colors={Colors.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>
              {getGreeting()}, {firstName} 👋
            </Text>
            <Text style={styles.date}>{formatDateBR()}</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {firstName.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Counter Cards */}
      <View style={styles.countersRow}>
        <CounterCard label="Total" value={counters.total} color={Colors.secondary} />
        <CounterCard label="Pendentes" value={counters.pending} color={Colors.status.pending} />
        <CounterCard label="Andamento" value={counters.inProgress} color={Colors.status.in_progress} />
        <CounterCard label="Concluídas" value={counters.completed} color={Colors.status.completed} />
      </View>

      {/* Section title */}
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>Ordens do dia</Text>
        <Feather name="navigation" size={14} color={Colors.textSecondary} />
        <Text style={styles.sectionSubtitle}>Ordenado por proximidade</Text>
      </View>
    </View>
  );
}

// ── Counter Card ──────────────────────────────────────

function CounterCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.counterCard}>
      <Text style={[styles.counterValue, { color }]}>{value}</Text>
      <Text style={styles.counterLabel}>{label}</Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontFamily: FontFamily.inter.regular,
  },
  list: {
    paddingBottom: 32,
  },

  // ── Header ──
  headerWrapper: {
    marginBottom: 8,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: FontFamily.outfit.bold,
  },
  date: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    fontFamily: FontFamily.inter.regular,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ── Counters ──
  countersRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginTop: -12,
  },
  counterCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  counterValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  counterLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },

  // ── Section Title ──
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    fontFamily: FontFamily.inter.semibold,
    marginRight: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  // ── Empty ──
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontFamily: FontFamily.inter.regular,
  },
});
