import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import { connect } from 'react-redux';

import TokenActions from '../Redux/TokenRedux';

// Styles
import styles from './Styles/AuthScreenStyle';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

const LOGIN_URL = 'http://192.168.0.19:3005/auth/github/';
const REDIRECT_URL = 'http://192.168.0.19:3005/explorer/';

class AuthScreen extends Component {
  onNavigationStateChange = navState => {
    if (navState.url === REDIRECT_URL) {
      this.props.getToken();
    }
  };

  render() {
    return (
      <View style={[styles.container]}>
        <WebView
          ref="webview"
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{ uri: LOGIN_URL }}
          javaScriptEnabled
          onNavigationStateChange={this.onNavigationStateChange}
          startInLoadingState
          scalesPageToFit
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getToken: () => dispatch(TokenActions.tokenRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
