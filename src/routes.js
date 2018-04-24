import { StackNavigator } from 'react-navigation';

import Repositories from 'pages/repositories';
import Issues from 'pages/issues';

const Routes = StackNavigator({
  Home: { screen: Repositories },
  Issues: { screen: Issues },
}, {
  initialRouteName: 'Home',
});

export default Routes;
