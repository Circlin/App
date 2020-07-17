import React, {Component} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import styled from 'styled-components/native';
import LoginBg from '../components/LoginBg';
import {SafeAreaView} from 'react-native-safe-area-context';
import KakaoLogins from '@react-native-seoul/kakao-login';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
const API_URL = 'https://www.circlin.co.kr/circlinApi/v3/';
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};
const Wrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 50px;
  justify-content: flex-end;
`;

const ModalContainer = styled.View`
  height: 100%;
  justify-content: space-between;
`;

const ModalContentContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 24px;
  border-bottom-width: 1px;
  border-bottom-color: #e6e6e6;
`;

const ModalContentTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const ModalSocialContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ModalSocial = styled.View`
  justify-content: center;
  align-items: center;
`;

const Icon = styled.Image`
  border-radius: 24px;
  width: 48px;
  height: 48px;
`;
const IconName = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-top: 12px;
`;

class LoginScreen extends Component {
  state = {
    animate: false,
    userId: '',
    accessToken: '',
    refreshToken: '',
    accessTokenExpireTime: 0,
    refreshTokenExpireTime: 0,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  kakaoLogin = () => {
    KakaoLogins.login()
      .then((tokenData) => {
        this.setState({
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
          accessTokenExpireTime: tokenData.accessTokenExpiresAt,
          refreshTokenExpireTime: tokenData.refreshTokenExpiresAt,
        });
        KakaoLogins.getProfile()
          .then((result) => {
            this.setState({
              userId: result.id + '@K',
            });
            this._loginToServer();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  facebookLogin = async () => {
    await LoginManager.logInWithPermissions(['public_profile'])
      .then((result) => {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken().then((data) => {
            this.setState({
              userId: data.userID + '@F',
              accessToken: data.accessToken,
              refreshToken: '',
              accessTokenExpireTime: data.expirationTime,
              refreshTokenExpireTime: 0,
            });
            this._loginToServer();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  _loginToServer = async () => {
    this.setState({
      animate: true,
    });
    fetch(API_URL + 'login/sns', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.userId,
        access_token: this.state.accessToken,
        refresh_token: this.state.refreshToken,
        access_expire: this.state.accessTokenExpireTime,
        refresh_expire: this.state.refreshTokenExpireTime,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.resPonseCode == 200) {
          storeData('token', result.token);
          storeData('uid', result.uid);
          if (result.type == 'login') {
            //go to home
          } else {
            //go to signup next
          }
        }
      })
      .catch((error) => console.log(error));
  };
  render() {
    console.log(this.state);
    return (
      <>
        <StatusBar barStyle="light-content" />
        <LoginBg />
        <Wrapper>
          <Button
            mode="contained"
            mode="dark"
            onPress={() => this.props.navigation.navigate('이메일로그인')}
            style={{
              borderRadius: 4,
              backgroundColor: '#ffffff',
              marginBottom: 15,
            }}
            contentStyle={{height: 50}}>
            써클인 아이디로 로그인
          </Button>
          <Button
            mode="outlined"
            color="#ffffff"
            onPress={() => {
              this.RBSheet.open();
            }}
            style={{borderRadius: 4, borderColor: '#ffffff', marginBottom: 15}}
            contentStyle={{height: 50}}>
            SNS 계정으로 로그인
          </Button>
        </Wrapper>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={256}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'space-between',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          }}>
          <SafeAreaView>
            <ModalContainer>
              <ModalContentContainer>
                <ModalContentTitle>SNS 계정으로 로그인</ModalContentTitle>
                <ModalSocialContainer>
                  <ModalSocial>
                    <TouchableOpacity
                      onPress={() => {
                        this.kakaoLogin();
                      }}>
                      <Icon source={require('../assets/kakaotalk.png')} />
                      <IconName>카카오톡</IconName>
                    </TouchableOpacity>
                  </ModalSocial>
                  <ModalSocial>
                    <TouchableOpacity
                      onPress={() => {
                        this.facebookLogin();
                      }}>
                      <Icon source={require('../assets/facebook.png')} />
                      <IconName>페이스북</IconName>
                    </TouchableOpacity>
                  </ModalSocial>
                </ModalSocialContainer>
              </ModalContentContainer>
              <Button
                mode="text"
                onPress={() => {
                  this.RBSheet.close();
                }}
                style={{borderRadius: 0}}
                contentStyle={{height: 50}}>
                취소
              </Button>
            </ModalContainer>
          </SafeAreaView>
        </RBSheet>
      </>
    );
  }
}

export default LoginScreen;
