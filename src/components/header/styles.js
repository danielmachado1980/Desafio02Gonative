import { StyleSheet } from 'react-native';
import { colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 20,
    height: 80,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  headerTitle: {
    flex: 1,
  },
  rightHeader: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    backgroundColor: colors.lowLight,
    borderRadius: 5,
    height: 40,
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: colors.darker,
  },
  button: {
    fontSize: 12,
    color: colors.darker,
  },
});

export default styles;
