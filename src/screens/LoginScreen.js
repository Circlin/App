import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Button} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import styled from 'styled-components/native';
import LoginBg from '../components/LoginBg';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <LoginBg />
        <Wrapper>
          <Button
            mode="contained"
            mode="dark"
            onPress={() => this.props.navigation.navigate("이메일로그인")}
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
                    <Icon source={require('../assets/kakaotalk.png')} />
                    <IconName>카카오톡</IconName>
                  </ModalSocial>
                  <ModalSocial>
                    <Icon source={require('../assets/facebook.png')} />
                    <IconName>페이스북</IconName>
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
