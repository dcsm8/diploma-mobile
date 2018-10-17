import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode';
import styles from './Styles/CertificateDetailsStyle';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

class CertificateDetails extends Component {
  render() {
    const { visible, onDismiss, ipfsUrl } = this.props;
    console.log(ipfsUrl);
    return (
      <PopupDialog
        ref={popupDialog => {
          this.popupDialog = popupDialog;
        }}
        dialogTitle={
          <DialogTitle
            title="SISTEMA INTERPLANETARIO DE ARCHIVOS"
            titleTextStyle={{
              textAlign: 'center',
            }}
          />
        }
        dialogAnimation={slideAnimation}
        show={visible}
        onDismissed={onDismiss}
        width={0.9}
      >
        <View style={styles.container}>
          <QRCode value={ipfsUrl} size={200} bgColor="black" fgColor="white" />
        </View>
      </PopupDialog>
    );
  }
}

CertificateDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  ipfsUrl: PropTypes.string.isRequired,
};

export default CertificateDetails;
