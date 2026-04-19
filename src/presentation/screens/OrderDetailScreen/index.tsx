import { Feather } from '@expo/vector-icons';
import { MaterialList, PhotoPicker, SignaturePad, StatusBadge, GradientButton } from '@presentation/components';
import { Colors, FontFamily } from '@presentation/styles';
import { useOrderDetailViewModel } from '@presentation/viewmodels/useOrderDetailViewModel';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {
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
  } = useOrderDetailViewModel(id);

  const { signature: newSignature } = useLocalSearchParams<{ signature: string }>();

  // Sync signature from route params (if returning from SignatureScreen)
  React.useEffect(() => {
    if (newSignature && newSignature !== signature) {
      setSignature(newSignature);
    }
  }, [newSignature, signature, setSignature]);

  const handleCall = () => {
    if (order?.clientPhone) {
      Linking.openURL(`tel:${order.clientPhone.replace(/\D/g, '')}`);
    }
  };

  const handleFinalize = async () => {
    try {
      await submitFinalization();
      Alert.alert('Sucesso', 'Ordem de serviço finalizada com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao finalizar ordem');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.main} />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.errorContainer}>
        <Text>Ordem não encontrada</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: Colors.main, marginTop: 12 }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isCompleted = order.status === 'completed';

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerId}>OS #{order.id}</Text>
          <StatusBadge status={order.status} />
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Client Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados do Cliente</Text>
          <View style={styles.clientCard}>
            <View style={styles.clientInfo}>
              <Text style={styles.clientName}>{order.clientName}</Text>
              <TouchableOpacity style={styles.phoneButton} onPress={handleCall}>
                <Feather name="phone" size={16} color={Colors.main} />
                <Text style={styles.phoneText}>{order.clientPhone}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addressBox}>
              <Feather name="map-pin" size={16} color={Colors.textSecondary} />
              <Text style={styles.addressText}>
                {order.address.street}, {order.address.number}{'\n'}
                {order.address.neighborhood}, {order.address.city} - {order.address.state}
              </Text>
            </View>
          </View>
        </View>

        {/* Service Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição do Serviço</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.serviceType}>{order.serviceType}</Text>
            <Text style={styles.descriptionText}>{order.description}</Text>
            {order.notes && (
              <View style={styles.notesBox}>
                <Text style={styles.notesLabel}>Observações:</Text>
                <Text style={styles.notesText}>{order.notes}</Text>
              </View>
            )}
          </View>
        </View>

        {!isCompleted && (
          <>
            {/* Photos */}
            <PhotoPicker
              photos={photos}
              onAddPhoto={addPhoto}
              onRemovePhoto={removePhoto}
            />

            {/* Materials */}
            <MaterialList
              materials={materials}
              onAdd={addMaterial}
              onRemove={removeMaterial}
            />

            {/* Signature */}
            <SignaturePad
              orderId={order.id}
              signature={signature}
              onClear={() => setSignature('')}
            />

            {/* Finalize Button */}
            <View style={styles.footer}>
              <GradientButton
                text="Finalizar Ordem"
                gradient="secondary"
                loading={finalizing}
                onPress={handleFinalize}
                disabled={photos.length === 0 || !signature}
              />
              {(photos.length === 0 || !signature) && (
                <Text style={styles.helperText}>
                  Anexe fotos e colete a assinatura para finalizar
                </Text>
              )}
            </View>
          </>
        )}

        {isCompleted && (
          <View style={styles.completedBox}>
            <Feather name="check-circle" size={48} color={Colors.sucess} />
            <Text style={styles.completedTitle}>OS Finalizada</Text>
            <Text style={styles.completedDate}>
              Finalizada em {new Date(order.finishedAt!).toLocaleDateString('pt-BR')} às {new Date(order.finishedAt!).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerId: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  content: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  clientCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  clientInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  clientName: {
    fontSize: 18,
    fontFamily: FontFamily.inter.semibold,
    color: Colors.text,
    flex: 1,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  phoneText: {
    fontSize: 13,
    color: Colors.main,
    fontWeight: '600',
  },
  addressBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
  },
  addressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  descriptionBox: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
  },
  serviceType: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.main,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
  },
  notesBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 12,
  },
  helperText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  completedBox: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  completedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  completedDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
