import { StyleSheet } from 'react-native';
import { metrics, colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 30,
    backgroundColor: colors.light,
    borderRadius: metrics.baseRadius,
    marginHorizontal: metrics.basePadding,
    marginTop: metrics.basePadding,
    borderTopWidth: 0,
  },
  tab: {
    color: colors.dark,
  },
  active: {
    fontWeight: 'bold',
  },
  loading: {
    alignSelf: 'center',
  },
});

export default styles;
