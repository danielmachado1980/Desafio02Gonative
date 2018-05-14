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
    marginTop: metrics.baseMargin,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 30,
  },
  iconRight: {
    color: colors.lowLight,
  },
  containerText: {
    flex: 1,
    alignContent: 'flex-start',
    paddingLeft: 10,
  },
  description: {
    color: colors.description,
  },
  title: {
    fontWeight: 'bold',
    color: colors.darker,
    marginBottom: 5,
  },
});

export default styles;
