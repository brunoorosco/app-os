import { Colors } from '@presentation/styles';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { styles } from './styles';

interface GradientButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  gradient: keyof typeof Colors.button;
}

export function GradientButton({
  text,
  onPress,
  disabled = false,
  loading = false,
  gradient,
}: GradientButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled || loading}
      style={styles.button}
    >
      <LinearGradient
        colors={Colors.button[gradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{text}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
