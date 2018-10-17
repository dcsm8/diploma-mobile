import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  login: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
  },
  headline: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 10,
  },
  subheading: {
    fontSize: 25,
    textAlign: 'center',
  },
});
