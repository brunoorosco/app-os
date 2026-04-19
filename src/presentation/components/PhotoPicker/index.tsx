import { Feather } from '@expo/vector-icons';
import { Colors } from '@presentation/styles';
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';

interface PhotoPickerProps {
  photos: string[];
  onAddPhoto: () => void;
  onRemovePhoto: (index: number) => void;
}

export function PhotoPicker({ photos, onAddPhoto, onRemovePhoto }: PhotoPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fotos da Instalação</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        <TouchableOpacity style={styles.addButton} onPress={onAddPhoto}>
          <Feather name="camera" size={24} color={Colors.main} />
          <Text style={styles.addText}>Adicionar</Text>
        </TouchableOpacity>

        {photos.map((uri, index) => (
          <View key={uri} style={styles.photoWrapper}>
            <Image source={{ uri }} style={styles.photo} />
            <TouchableOpacity style={styles.removeButton} onPress={() => onRemovePhoto(index)}>
              <Feather name="x" size={12} color="#FFF" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 16,
    gap: 12,
  },
  addButton: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.main,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
  },
  addText: {
    fontSize: 12,
    color: Colors.main,
    marginTop: 4,
    fontWeight: '600',
  },
  photoWrapper: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
