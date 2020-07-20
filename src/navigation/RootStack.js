import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import TestScreen from '../screens/TestScreen';
import EmailLoginScreen from '../screens/EmailLoginScreen';
import FindPasswordScreen from '../screens/FindPasswordScreen';
import SignupScreen from '../screens/SignupScreen';
import PhoneAuthScreen from '../screens/PhoneAuthScreen';
import AddAuthFirstScreen from '../screens/AddAuthFirstScreen';

const Stack = createStackNavigator();

class RootStack extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName={this.props.route}>
        <Stack.Screen
          name="로그인"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="이메일로그인"
          component={EmailLoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="회원가입"
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="비밀번호찾기"
          component={FindPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="휴대폰본인인증"
          component={PhoneAuthScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="추가정보입력첫번째"
          component={AddAuthFirstScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="추가정보입력두번째"
          component={AddAuthFirstScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="바텀탭"
          component={TestScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="상세정보" component={TestScreen} />
      </Stack.Navigator>
    );
  }
}

export default RootStack;
