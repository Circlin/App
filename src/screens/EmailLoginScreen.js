import React, {Component} from 'react';
import {TextInput, HelperText, Button, Title} from 'react-native-paper';
import styled from 'styled-components/native';
import BackHeader from '../components/BackHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import {storeData} from '../../src/common';

const API_URL = 'https://www.circlin.co.kr/circlinApi/v3/';

const Page = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const Container = styled.View`
  padding: 0 24px;
`;

const TitleContainer = styled.View`
  padding: 16px 0;
`;

const SubTitle = styled.Text`
  font-size: 14px;
  margin-top: 8px;
`;

const TextButtonContainer = styled.View`
  margin-top: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

class EmailLoginScreen extends Component {
  state = {
    animate: false,
    email: '',
    password: '',
    emailCheck: false,
    passwordCheck: false,
  };

  checkEmail = (email) => {
    if (email) {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (regExp.test(email)) {
        this.setState({emailCheck: false});
      } else {
        this.setState({emailCheck: true});
      }
    }
  };
  checkPassword = (password) => {
    if (password) {
      var regExp = /^[A-Za-z0-9]{6,12}$/;
      if (regExp.test(password)) {
        this.setState({passwordCheck: false});
      } else {
        this.setState({passwordCheck: true});
      }
    }
  };
  userLogin = async () => {
    this.setState({
      animate: true,
    });
    await fetch(API_URL + 'user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: this.state.email,
        userPassword: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.resPonseCode == 200) {
          storeData('token', result.token);
          storeData('uid', result.uid);
          this.props.navigation.navigate('바텀탭');
        }
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <Page>
        <SafeAreaView>
          <BackHeader navigation={this.props.navigation} />
          <Container>
            <TitleContainer>
              <Title>써클인 로그인</Title>
            </TitleContainer>
            <TextInput
              label="이메일"
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 0,
                height: 64,
              }}
              autoCapitalize="none"
              value={this.state.email}
              onChangeText={(text) => {
                this.setState({email: text});
                this.checkEmail(text);
              }}
            />
            <HelperText
              type="error"
              visible={this.state.emailCheck}
              padding="none">
              이메일 형식으로 입력해주세요
            </HelperText>
            <TextInput
              label="비밀번호"
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 0,
                height: 64,
              }}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(text) => {
                this.setState({password: text});
                this.checkPassword(text);
              }}
            />
            <HelperText
              type="error"
              visible={this.state.passwordCheck}
              padding="none">
              패스워드는 영+숫자 포함 6~12자리로 입력주세요
            </HelperText>
            <Button
              mode="contained"
              onPress={() => {
                this.userLogin();
              }}
              disabled={
                !this.state.emailCheck &&
                !this.state.passwordCheck &&
                this.state.email &&
                this.state.password
                  ? false
                  : true
              }
              style={{marginTop: 16}}
              contentStyle={{height: 50}}>
              로그인
            </Button>
            <TextButtonContainer>
              <Button
                mode="text"
                onPress={() => {
                  this.props.navigation.navigate('회원가입');
                }}
                ContentStyle={{paddingHorizontal: 0}}
                style={{minWidth: 0}}
                labelStyle={{
                  fontSize: 12,
                  marginHorizontal: 0,
                  marginVertical: 0,
                }}>
                회원가입
              </Button>
              <Button
                mode="text"
                onPress={() => {
                  this.props.navigation.navigate('비밀번호찾기');
                }}
                ContentStyle={{paddingHorizontal: 0}}
                style={{minWidth: 0}}
                labelStyle={{
                  fontSize: 12,
                  marginHorizontal: 0,
                  marginVertical: 0,
                }}>
                비밀번호 찾기
              </Button>
            </TextButtonContainer>
          </Container>
        </SafeAreaView>
      </Page>
    );
  }
}
export default EmailLoginScreen;
