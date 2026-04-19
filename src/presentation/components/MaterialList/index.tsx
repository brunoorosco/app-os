import { Feather } from '@expo/vector-icons';
import { Material } from '@domain/entities/ServiceOrder';
import { Colors } from '@presentation/styles';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface MaterialListProps {
  materials: Material[];
  onAdd: (name: string, quantity: number) => void;
  onRemove: (index: number) => void;
}

export function MaterialList({ materials, onAdd, onRemove }: MaterialListProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAdd = () => {
    if (name && quantity) {
      onAdd(name, parseInt(quantity));
      setName('');
      setQuantity('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Materiais Utilizados</Text>

      {/* Input Row */}
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="Material"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Qtd"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* List */}
      <View style={styles.list}>
        {materials.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>{item.quantity} un</Text>
            <TouchableOpacity onPress={() => onRemove(index)}>
              <Feather name="trash-2" size={16} color={Colors.error} />
            </TouchableOpacity>
          </View>
        ))}
        {materials.length === 0 && (
          <Text style={styles.emptyText}>Nenhum material adicionado</Text>
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
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addButton: {
    backgroundColor: Colors.main,
    width: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    gap: 12,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  itemQuantity: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 14,
    paddingVertical: 8,
  },
});
