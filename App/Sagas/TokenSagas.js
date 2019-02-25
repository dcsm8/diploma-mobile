import { call, put } from 'redux-saga/effects';
import CookieManager from 'react-native-cookies';
import { NavigationActions } from 'react-navigation';
import TokenActions from '../Redux/TokenRedux';

const HOME_URL = 'http://192.168.0.19:3005/';

function getCookie(cookie, name) {
  let decodedCookie = decodeURIComponent(cookie[name]);
  decodedCookie = decodedCookie.replace(':', '.');
  return decodedCookie.split('.')[1];
}

function requestToken() {
  return new Promise(resolve => {
    CookieManager.get(HOME_URL).then(res => {
      resolve(getCookie(res, 'access_token'));
    });
  });
}

export function* getToken() {
  const response = yield call(requestToken);
  if (response) {
    yield put(TokenActions.tokenSuccess(response));
    yield put(NavigationActions.navigate({ routeName: 'CardScreen' }));
  } else {
    yield put(TokenActions.tokenFailure());
  }
}
