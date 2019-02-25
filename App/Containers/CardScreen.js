import React, { Component } from 'react';
import { View, Image, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Button, Subheading } from 'react-native-paper';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

import { Images } from '../Themes';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CardScreenStyle';

const FilePicker = NativeModules.FileChooser;

class CardScreen extends Component {
  onButtonPressed = () => {
    FilePicker.show(
      {
        title: 'File Picker',
      },
      response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled file chooser');
        } else if (response.error) {
          console.log('FileChooserManager Error: ', response.error);
        } else {
          axios
            .get(`http://192.168.0.19:3005/api/wallet`)
            .then(walletsResponse => {
              console.log(walletsResponse);
              if (walletsResponse.data.length === 0) {
                RNFetchBlob.fetch(
                  'POST',
                  'http://192.168.0.19:3005/api/wallet/import',
                  {
                    withCredentials: 'true',
                    'Content-Type': 'multipart/form-data',
                  },
                  [
                    // append field data from file path
                    {
                      name: 'card',
                      filename: response.fileName,
                      // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
                      // Or simply wrap the file path with RNFetchBlob.wrap().
                      data: RNFetchBlob.wrap(response.uri),
                    },
                  ]
                )
                  .then(resp => {
                    console.log('DESPUES DE SUBIR EL ARCHIVO', resp);
                    this.props.navigation.navigate('HomeScreen');
                  })
                  .catch(err => {
                    console.log('ERROR AL INTENTAR SUBIR EL ARCHIVO', err);
                  });
              } else {
                this.props.navigation.navigate('HomeScreen');
              }
            })
            .catch(e => console.log(e));
        }
      }
    );
  };

  render() {
    return (
      <View style={[styles.mainContainer, styles.login]}>
        <Headline style={styles.headline}>
          Para completar el registro debe cargar el archivo enviado a su correo
        </Headline>
        <Image style={{ flex: 1, width: null }} resizeMode="contain" source={Images.addCard} />
        <Button mode="contained" onPress={this.onButtonPressed}>
          Seleccionar Archivo
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
)(CardScreen);
