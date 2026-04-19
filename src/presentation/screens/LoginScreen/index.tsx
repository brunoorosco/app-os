import { GradientText } from '@presentation/components';
import { GradientButton } from '@presentation/components/GradientButton';
import Input from '@presentation/components/Input';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { styles } from './styles';

export default function LoginScreen() {
  const [info, setInfo] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const handleLogin = () => {
    if (info.email === 'admin@email.com' && info.password === '123456') {
      router.replace('/(app)/orders');
    } else {
      alert('Email ou senha inválidos');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <GradientText gradient="main">Entrar</GradientText>
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
          </View>
        </View>
        <View style={styles.footerContainer}>
          <GradientButton onPress={handleLogin} text="Entrar" gradient="main" />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Não possui conta?</Text>
            <Link href="/(auth)/register" asChild>
              <Text style={styles.textLink}>Cadastrar</Text>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
