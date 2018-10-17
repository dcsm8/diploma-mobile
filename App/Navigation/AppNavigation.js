import { StackNavigator } from 'react-navigation';
import CameraScreen from '../Containers/CameraPage';
import LoginScreen from '../Containers/LoginScreen';
import CertificateScreen from '../Containers/CertificateScreen';
import HomeScreen from '../Containers/HomeScreen';
import AuthScreen from '../Containers/AuthScreen';
import LaunchScreen from '../Containers/LaunchScreen';
import CardScreen from '../Containers/CardScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    AuthScreen: { screen: AuthScreen },
    LaunchScreen: { screen: LaunchScreen },
    HomeScreen: { screen: HomeScreen },
    CertificateScreen: { screen: CertificateScreen },
    CardScreen: { screen: CardScreen },
    CameraScreen: { screen: CameraScreen },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
    navigationOptions: {
      headerStyle: styles.header,
    },
  }
);

export default PrimaryNav;
