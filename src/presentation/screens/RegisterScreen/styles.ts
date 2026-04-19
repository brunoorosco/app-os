import { Colors, FontFamily, FontSize } from '@presentation/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingTop: 130,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    gap: 100,
    justifyContent: 'flex-start',
    paddingInline: 32,
  },
  mainContainer: {
    alignItems: 'center',
    gap: 94,
    width: '100%',
  },
  inputContainer: {
    gap: 16,
    width: '100%',
  },
  footerContainer: {
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    fontSize: FontSize.subtitle,
    fontFamily: FontFamily.inter.regular,
  },
  textLink: {
    fontSize: FontSize.subtitle,
    fontFamily: FontFamily.inter.semibold,
    color: Colors.sucess,
  },
});
