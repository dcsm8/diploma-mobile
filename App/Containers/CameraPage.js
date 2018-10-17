import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { Appbar, Subheading } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

class CameraPage extends Component {
  goBack = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.goBack} />
          <Appbar.Content title="Escanear código QR" />
        </Appbar.Header>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 20,
          }}
        >
          <Subheading>
            Al escanear el código QR se abrirá una nueva pestaña en el navegador
          </Subheading>
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            Linking.openURL(barcodes[0].data).catch(err => console.error('An error occurred', err));
          }}
        />
      </View>
    );
  }
}

export default CameraPage;
