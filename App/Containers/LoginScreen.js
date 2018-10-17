import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Button, Subheading } from 'react-native-paper';
import CookieManager from 'react-native-cookies';
import { Images } from '../Themes';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle';

class LoginScreen extends Component {
  componentDidMount = () => {
    CookieManager.clearAll().then(res => {
      console.log('CookieManager.clearAll =>', res);
    });
  };

  onButtonPressed = () => {
    this.props.navigation.navigate('AuthScreen');
  };

  openScanner = () => {
    this.props.navigation.navigate('CameraScreen');
  };

  render() {
    return (
      <View style={[styles.mainContainer, styles.login]}>
        <Headline style={styles.headline}>Solución Blockchain Certificados Académicos</Headline>
        <Subheading style={styles.subheading}>Facultad Tecnologica - UDFJC</Subheading>
        <Image style={{ flex: 1, width: null }} resizeMode="contain" source={Images.login} />
        <Button
          mode="contained"
          onPress={this.openScanner}
          color="#006064"
          style={{ marginBottom: 30 }}
        >
          Escanear código QR
        </Button>
        <Button mode="contained" onPress={this.onButtonPressed}>
          Iniciar Sesion
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
