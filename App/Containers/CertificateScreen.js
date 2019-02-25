import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import CertificateDetails from '../Components/CertificateDetails';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
// import styles from './Styles/CertificateScreenStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

class CertificateScreen extends Component {
  state = {
    visible: false,
  };

  showModal = () =>
    this.setState({
      visible: true,
    });

  hideModal = () =>
    this.setState({
      visible: false,
    });

  goBack = () => {
    this.props.navigation.navigate('HomeScreen');
  };

  onShare = () => {
    const shareOptions = {
      title: 'Certificate test',
      url: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    };
    return Share.open(shareOptions);
  };

  render() {
    const { navigation } = this.props;
    const { visible } = this.state;
    const certificate = navigation.getParam('certificate', null);

    /* certificate = {
      ipfsUrl: 'QmQfHEnwKJxmGS8QtdH5f7rhtSNmrwVHjRq9y2aL4Na7dB',
      title: 'INGENIERIA TELEMATICA',
      date: '09 de Octubre',
    }; */
    const uri = `https://ipfs.io/ipfs/${certificate.ipfsUrl}`;

    const source = {
      uri,
      cache: true,
    };
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.goBack} />
          <Appbar.Content title={certificate.title} subtitle={certificate.date} />
          <Appbar.Action icon="more-vert" onPress={this.showModal} />
        </Appbar.Header>
        <CertificateDetails visible={visible} onDismiss={this.hideModal} ipfsUrl={uri} />
        {certificate && (
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            style={styles.pdf}
          />
        )}
        <Button
          icon="share"
          mode="text"
          onPress={this.onShare}
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: 30,
          }}
        >
          Compartir
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
)(CertificateScreen);
