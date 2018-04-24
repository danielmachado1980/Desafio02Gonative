import { StackNavigator } from 'react-navigation';

import Lista from 'pages/lista';
import Issues from 'pages/issues';

const Routes = StackNavigator({
  Home: { screen: Lista },
  Issues: { screen: Issues },
}, {
  initialRouteName: 'Home',
});

export default Routes;
