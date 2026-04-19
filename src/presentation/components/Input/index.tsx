import { Feather } from '@expo/vector-icons';
import { Colors } from '@presentation/styles';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { styles } from './styles';

type InputType = 'text' | 'email' | 'password' | 'phone' | 'number' | 'name';

export interface InputProps
  extends Omit<TextInputProps, 'onChange' | 'onChangeText' | 'keyboardType'> {
  value: string;
  onChangeText: (text: string) => void;
  type?: InputType;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  showTogglePassword?: boolean;
  flatBorder?: boolean;
  gradient?: keyof typeof Colors.border;
}

export default function Input({
  value,
  onChangeText,
  type = 'text',
  containerStyle,
  inputStyle,
  showTogglePassword,
  flatBorder = false,
  placeholderTextColor = '#A1A1AA',
  autoCapitalize,
  autoCorrect,
  gradient = 'main',
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [reveal, setReveal] = useState(false);

  const isPassword = type === 'password';
  const showEye = showTogglePassword ?? isPassword;

  const config = useMemo(() => {
    switch (type) {
      case 'email':
        return {
          keyboardType: 'email-address' as const,
          autoCapitalize: 'none' as const,
          autoComplete: 'email' as const,
          textContentType: 'emailAddress' as const,
          secureTextEntry: false,
          leftIcon: 'mail' as const,
        };
      case 'password':
        return {
          keyboardType: 'default' as const,
          autoCapitalize: 'none' as const,
          autoComplete: 'password' as const,
          textContentType: Platform.OS === 'ios' ? ('newPassword' as const) : ('password' as const),
          secureTextEntry: !reveal,
          leftIcon: 'lock' as const,
        };
      case 'phone':
        return {
          keyboardType: 'phone-pad' as const,
          autoCapitalize: 'none' as const,
          autoComplete: 'tel' as const,
          textContentType: 'telephoneNumber' as const,
          secureTextEntry: false,
          leftIcon: 'phone' as const,
        };
      case 'number':
        return {
          keyboardType: Platform.OS === 'ios' ? ('number-pad' as const) : ('numeric' as const),
          autoCapitalize: 'none' as const,
          autoComplete: 'off' as const,
          textContentType: 'none' as const,
          secureTextEntry: false,
          leftIcon: 'hash' as const,
        };
      case 'name':
        return {
          keyboardType: 'default' as const,
          autoCapitalize: 'words' as const,
          autoComplete: 'name' as const,
          textContentType: 'name' as const,
          secureTextEntry: false,
          leftIcon: 'user' as const,
        };
      default:
        return {
          keyboardType: 'default' as const,
          autoCapitalize: 'none' as const,
          autoComplete: 'off' as const,
          textContentType: 'none' as const,
          secureTextEntry: false,
          leftIcon: 'type' as const,
        };
    }
  }, [type, reveal]);

  return (
    <LinearGradient
      colors={Colors.border[gradient]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[styles.border, containerStyle]}
    >
      <View style={styles.inner}>
        <Feather name={config.leftIcon} size={18} color="#9CA3AF" style={styles.leftIcon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, inputStyle]}
          placeholderTextColor={placeholderTextColor}
          autoCapitalize={autoCapitalize ?? config.autoCapitalize}
          autoCorrect={autoCorrect ?? false}
          keyboardType={config.keyboardType}
          secureTextEntry={config.secureTextEntry}
          textContentType={config.textContentType}
          autoComplete={config.autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {showEye && (
          <TouchableOpacity
            onPress={() => setReveal((prev) => !prev)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.rightIcon}
          >
            <Feather name={reveal ? 'eye' : 'eye-off'} size={18} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}
