import React, {Component} from 'react';
import {
  CardStyleInterpolators,
  TransitionSpecs,
  createStackNavigator,
} from '@react-navigation/stack';
// [바텀 네비게이션]
import BottomTabNav from './BottomTabNav';
import AuthIndexScreen from '../screens/auth/AuthIndexSceen';
import AuthLoginScreen from '../screens/auth/AuthLoginScreen';
import FindPasswordScreen from '../screens/auth/FindPasswordScreen';
import AuthSignupScreen from '../screens/auth/AuthSignupScreen';
import PhoneAuthScreen from '../screens/auth/PhoneAuthScreen';
import AddProfile01Screen from '../screens/auth/AddProfile01Screen';
import AddProfile02Screen from '../screens/auth/AddProfile02Screen';
import AddProfile03Screen from '../screens/auth/AddProfile03Screen';
import AddProfile04Screen from '../screens/auth/AddProfile04Screen';
import AddProfile05Screen from '../screens/auth/AddProfile05Screen';
import AddProfile06Screen from '../screens/auth/AddProfile06Screen';
import AddProfile07Screen from '../screens/auth/AddProfile07Screen';
import AddProfile08Screen from '../screens/auth/AddProfile08Screen';
import SearchScreen from '../screens/detail/SearchScreen';
import NoticeScreen from '../screens/detail/NoticeScreen';
import FeedDetailScreen from '../screens/detail/FeedDetailScreen';
import UserDetailScreen from '../screens/detail/UserDetailScreen';
import UploadScreen from '../screens/upload/UploadScreen';

const Auth = createStackNavigator();
const Detail = createStackNavigator();
const Upload = createStackNavigator();
const Root = createStackNavigator();

class AuthStack extends Component {
  render() {
    return (
      <Auth.Navigator>
        <Auth.Screen
          name="AuthIndex"
          component={AuthIndexScreen}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="AuthLogin"
          component={AuthLoginScreen}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="AuthSignup"
          component={AuthSignupScreen}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="비밀번호찾기"
          component={FindPasswordScreen}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="휴대폰본인인증"
          component={PhoneAuthScreen}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="AddProfile01"
          component={AddProfile01Screen}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="AddProfile02"
          component={AddProfile02Screen}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="AddProfile03"
          component={AddProfile03Screen}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="AddProfile04"
          component={AddProfile04Screen}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="AddProfile05"
          component={AddProfile05Screen}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="AddProfile06"
          component={AddProfile06Screen}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="AddProfile07"
          component={AddProfile07Screen}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="AddProfile08"
          component={AddProfile08Screen}
          options={{headerShown: false}}
        />
      </Auth.Navigator>
    );
  }
}

class DetailStack extends Component {
  render() {
    return (
      <Detail.Navigator mode="modal">
        <Detail.Screen
          name="검색"
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Detail.Screen
          name="알림"
          component={NoticeScreen}
          options={{headerShown: false}}
        />
        <Detail.Screen
          name="유저상세"
          component={UserDetailScreen}
          options={{headerShown: false}}
        />
        <Detail.Screen
          name="피드상세"
          component={FeedDetailScreen}
          options={{headerShown: false}}
        />
      </Detail.Navigator>
    );
  }
}

class UploadlStack extends Component {
  render() {
    return (
      <Upload.Navigator mode="modal">
        <Upload.Screen
          name="Upload01"
          component={UploadScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Upload.Navigator>
    );
  }
}

class RootStack extends Component {
  render() {
    return (
      <Root.Navigator initialRouteName={this.props.route}>
        <Root.Screen
          name="Auth"
          component={AuthStack}
          options={{headerShown: false}}
        />
        <Root.Screen
          name="Main"
          component={BottomTabNav}
          options={{headerShown: false}}
        />
        <Root.Screen
          name="Detail"
          component={DetailStack}
          options={{headerShown: false}}
        />
        <Root.Screen
          name="Upload"
          component={UploadlStack}
          options={{
            headerShown: false,
          }}
        />
      </Root.Navigator>
    );
  }
}

export default RootStack;
