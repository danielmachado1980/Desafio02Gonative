import { StyleSheet } from 'react-native';
import { metrics, colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
    marginHorizontal: metrics.basePadding,
    marginTop: metrics.basePadding,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 30,
  },
  infoContent: {
    flex: 1,
    paddingHorizontal: metrics.basePadding,
  },
  iconRight: {
    //color: colors.lowLight,
    fontSize: 20,
  },
  description: {
    color: colors.medium,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    color: colors.darker,
    //marginBottom: 5,
  },
});

export default styles;
