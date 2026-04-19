import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0F0C0', // verde menta
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  menu: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItem: {
    backgroundColor: '#28A745', // verde escuro
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  menuText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
});

export default styles;
