import { Colors, FontFamily, FontSize } from '@presentation/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    width: 220,
    borderRadius: 25,
  },
  gradient: {
    height: 50,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  text: {
    color: Colors.textButton,
    fontFamily: FontFamily.inter.regular,
    fontSize: FontSize.standard,
  },
});
