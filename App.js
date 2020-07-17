import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from './src/Main';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {useNavigation} from '@react-navigation/native';
const API_URL = 'https://www.circlin.co.kr/circlinApi/v3/';

export default class App extends Component {
  state = {
    route: '',
    token: '',
    uid: '',
  };
  componentDidMount() {
    this.getData('token');
  }
  getUserData = async (token) => {
    await fetch(API_URL + 'sessiontoken', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.resPonseCode == 200) {
          this.setState({
            route: '바텀탭',
          });
          SplashScreen.hide();
        }
      })
      .catch((error) => console.log(error));
  };
  getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        this.setState({
          route: '바텀탭',
          token: value,
        });
        this.getUserData(value);
      } else {
        this.setState({
          route: '로그인',
          value: '',
          uid: '',
        });
        SplashScreen.hide();
      }
    } catch (e) {
      // error reading value
    }
  };
  render() {
    return (
      <SafeAreaProvider>
        <Main route={this.state.route} />
      </SafeAreaProvider>
    );
  }
}
