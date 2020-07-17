import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import TestScreen from '../screens/TestScreen';
import EmailLoginScreen from '../screens/EmailLoginScreen';

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
        <Stack.Screen name="이메일로그인" component={EmailLoginScreen} />
        <Stack.Screen name="회원가입" component={TestScreen} />
        <Stack.Screen name="비밀번호찾기" component={TestScreen} />
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
