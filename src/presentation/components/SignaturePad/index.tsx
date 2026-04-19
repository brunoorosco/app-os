import { Feather } from '@expo/vector-icons';
import { Colors } from '@presentation/styles';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface SignaturePadProps {
  orderId: string;
  signature: string;
  onClear: () => void;
}

export function SignaturePad({ orderId, signature, onClear }: SignaturePadProps) {
  const router = useRouter();

  const handleOpenPad = () => {
    router.push({
      pathname: '/(app)/signature',
      params: { id: orderId },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Assinatura do Cliente</Text>
      <View style={styles.pad}>
        {signature ? (
          <View style={styles.signedContainer}>
            <Image
              source={{ uri: signature }}
              style={styles.signaturePreview}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={onClear} style={styles.clearButton}>
              <Feather name="trash-2" size={14} color={Colors.error} />
              <Text style={styles.clearText}>Refazer assinatura</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.placeholder} onPress={handleOpenPad}>
            <Feather name="edit-3" size={24} color={Colors.textSecondary} />
            <Text style={styles.placeholderText}>Toque para abrir a tela de assinatura</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  pad: {
    height: 160,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  placeholderText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  signedContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  signaturePreview: {
    width: '100%',
    height: 100,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  clearText: {
    color: Colors.error,
    fontSize: 13,
    fontWeight: '600',
  },
});
