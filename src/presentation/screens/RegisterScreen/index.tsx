import { GradientText } from '@presentation/components';
import { GradientButton } from '@presentation/components/GradientButton';
import Input from '@presentation/components/Input';
import { Link } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { styles } from './styles';

export default function RegisterScreen() {
  const [info, setInfo] = useState({
    email: '',
    password: '',
    confirm: '',
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <GradientText gradient="main">Criar Conta</GradientText>
          <View style={styles.inputContainer}>
            <Input
              type="email"
              placeholder="Email"
              value={info.email}
              onChangeText={(text) => setInfo((prev) => ({ ...prev, email: text }))}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={info.password}
              onChangeText={(text) => setInfo((prev) => ({ ...prev, password: text }))}
            />
            <Input
              type="password"
              placeholder="Confirmar senha"
              value={info.confirm}
              onChangeText={(text) => setInfo((prev) => ({ ...prev, confirm: text }))}
            />
          </View>
        </View>
        <View style={styles.footerContainer}>
          <GradientButton onPress={() => {}} text="Entrar" gradient="main" />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Já possui uma conta?</Text>
            <Link href="/(auth)/login" asChild>
              <Text style={styles.textLink}>Entrar</Text>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
