import { Colors } from '@presentation/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  border: {
    width: '100%',
    borderRadius: 12,
    padding: 1.2, // espessura da borda
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6', // fundo claro como no seu exemplo
    borderRadius: 10.5, // um pouco menor que o da borda para “revelar” o gradiente
    paddingHorizontal: 12,
    height: 48,
    width: '100%',
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: Colors.text ?? '#111827',
    fontSize: 16,
    paddingVertical: 0,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
