import React, {Component} from 'react';
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Button, IconButton, Colors} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import styled from 'styled-components/native';
import LoginBg from '../../components/LoginBg';
import {SafeAreaView} from 'react-native-safe-area-context';
// [로그인]
import KakaoLogins from '@react-native-seoul/kakao-login';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {storeData} from '../../common';

const API_URL = 'https://www.circlin.co.kr/circlinApi/v3/';

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
  text-align: center;
`;

class AuthIndexScreen extends Component {
  state = {
    uid: '',
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
            console.log(result);
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
            //go to Main
            this.setState(
              {
                uid: result.uid,
              },
              () => {
                this.props.navigation.navigate('Main');
              },
            );
          } else {
            //go to signup next
          }
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <LoginBg />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
          style={[styles.wrapper]}>
          <Button
            mode="contained"
            mode="dark"
            onPress={() => this.props.navigation.navigate('AddProfile01')}
            style={{
              borderRadius: 4,
              backgroundColor: Colors.white,
              marginTop: 16,
            }}
            contentStyle={{height: 60}}
            labelStyle={{fontWeight: 'bold', letterSpacing: 0}}>
            추가정보 입력
          </Button>
          <View style={[styles.buttonList]}>
            <Button
              mode="contained"
              mode="dark"
              onPress={() => this.props.navigation.navigate('Main')}
              style={{
                borderRadius: 4,
                backgroundColor: Colors.white,
                marginTop: 16,
              }}
              contentStyle={{height: 60}}
              labelStyle={{fontWeight: 'bold', letterSpacing: 0}}>
              메인화면
            </Button>
            <Button
              mode="contained"
              mode="dark"
              onPress={() => this.props.navigation.navigate('AuthLogin')}
              style={{
                borderRadius: 4,
                backgroundColor: Colors.white,
                marginTop: 16,
              }}
              contentStyle={{height: 60}}
              labelStyle={{fontWeight: 'bold', letterSpacing: 0}}>
              써클인 아이디로 로그인
            </Button>
            <Button
              mode="outlined"
              color={Colors.white}
              onPress={() => {
                this.RBSheet.open();
              }}
              style={{
                borderRadius: 4,
                borderColor: Colors.white,
                marginTop: 16,
              }}
              contentStyle={{height: 60}}
              labelStyle={{fontWeight: 'bold', letterSpacing: 0}}>
              SNS 계정으로 로그인
            </Button>
            <TouchableOpacity
              style={[styles.textButtonWhite]}
              onPress={() => this.props.navigation.navigate('AuthSignup')}>
              <Text style={[styles.textButtonWhiteText]}>
                이메일로 회원가입하기
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

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
                      <Icon source={require('../../assets/kakaotalk.png')} />
                      <IconName>카카오톡</IconName>
                    </TouchableOpacity>
                  </ModalSocial>
                  <ModalSocial>
                    <TouchableOpacity
                      onPress={() => {
                        this.facebookLogin();
                      }}>
                      <Icon source={require('../../assets/facebook.png')} />
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
                contentStyle={{height: 60}}>
                취소
              </Button>
            </ModalContainer>
          </SafeAreaView>
        </RBSheet>
      </>
    );
  }
}

export default AuthIndexScreen;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 64,
    justifyContent: 'flex-end',
  },

  buttonList: {justifyContent: 'center'},

  textButtonWhite: {
    marginTop: 24,
    alignSelf: 'center',
  },
  textButtonWhiteText: {
    fontSize: 12,
    color: Colors.white,
  },
});
