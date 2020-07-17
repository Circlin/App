import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from './src/Main';
import AsyncStorage from '@react-native-community/async-storage';
const API_URL = 'https://www.circlin.co.kr/circlinApi/v3/';
const getUserData = async (token) => {
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
        console.log(result);
      }
    })
    .catch((error) => console.log(error));
};
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      getUserData(value);
    }
  } catch (e) {
    // error reading value
  }
};
export default function App() {
  getData('token');
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
