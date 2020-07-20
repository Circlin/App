import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from './src/Main';
import {PermissionsAndroid, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Contacts from 'react-native-contacts';
import {storeData} from './src/common/index';
const API_URL = 'https://www.circlin.co.kr/circlinApi/v3/';

export default class App extends Component {
  state = {
    route: '',
    token: '',
    uid: '',
    contactList: [],
  };
  componentDidMount() {
    if (Platform.OS == 'ios') {
      Contacts.checkPermission((err, result) => {
        if (result == 'undefined') {
          Contacts.requestPermission((result) => {
            // console.log(result);
          });
        }
      });
    } else {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: '연락처',
        message: '써클인 앱에서 친구를 찾기위해 연락처를 수집합니다',
        buttonPositive: '확인',
      }).then(() => {
        // this.getContacts();
      });
    }

    this.getData('token');
  }
  // getContacts = async () => {
  //   if (Platform.OS == 'android') {
  //     await Contacts.getAllWithoutPhotos((err, result) => {
  //       result.map((contact, index) => {
  //         if (contact.givenName && contact.phoneNumbers[0]) {
  //           console.log(contact.phoneNumbers[0].number);
  //         }
  //       });
  //     });
  //   } else {
  //     await Contacts.getAllWithoutPhotos((err, result) => {
  //       result.map((contact, index) => {
  //         if (contact.givenName && contact.phoneNumbers[0]) {
  //           removeHypen = contact.phoneNumbers[0].number.replaceAll('-', '');
  //           removeGlobalCode = removeHypen.replaceAll('+82', '');
  //           this.setState({
  //             contactList: this.state.contactList.concat({
  //               userPk: this.state.uid,
  //               number: removeGlobalCode
  //                 .replaceAll('//', '')
  //                 .replaceAll('\n', ''),
  //             }),
  //           });
  //         }
  //       });
  //     });
  //   }
  // };
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
    console.log(this.state.contactList);
    return (
      <SafeAreaProvider>
        <Main route={this.state.route} />
      </SafeAreaProvider>
    );
  }
}
