import React, {Component} from 'react';
import {TextInput, HelperText, Button, Title} from 'react-native-paper';
import styled from 'styled-components/native';
import BackHeader from '../components/BackHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {storeData} from '../../src/common';

const API_URL = 'https://www.circlin.co.kr/circlinApi/v3/';

const Bold = styled.Text``;

const B = (props) => <Bold style={{fontWeight: 'bold'}}>{props.children}</Bold>;

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

const BottomText = styled.Text`
  margin-top: 8px;
  font-size: 12px;
  text-align: center;
`;

class EmailLoginScreen extends Component {
  state = {
    email: '',
    emailWarnMessage: '',
    emailHasYn: false,
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
      this.emailHasYn(email);
    }
  };
  emailHasYn = (email) => {
    fetch(API_URL + 'user/' + email, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.resPonseCode == 200) {
          this.setState({
            emailWarnMessage: '이메일 형식으로 입력해주세요',
            emailCheck: false,
          });
        } else {
          this.setState({
            emailWarnMessage: '이미 가입되어 있는 이메일입니다.',
            emailCheck: true,
          });
        }
      })
      .catch((error) => console.log(error));
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
  signUpUser = () => {
    this.setState({
      animate: true,
    });
    fetch(API_URL + 'user/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        passwd: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.resPonseCode == 200) {
          storeData('token', result.token);
          storeData('uid', result.uid);
          alert('nextSignup');
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
              <Title>써클인 회원가입</Title>
              <SubTitle>
                간편하게 써클인에 회원가입하고{'\n'}건강한 바깥생활을
                즐겨보세요!
              </SubTitle>
            </TitleContainer>
            <TextInput
              label="이메일"
              style={{backgroundColor: '#ffffff', paddingHorizontal: 0}}
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
              {this.state.emailWarnMessage}
            </HelperText>
            <TextInput
              label="비밀번호"
              style={{backgroundColor: '#ffffff', paddingHorizontal: 0}}
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
                this.signUpUser();
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
              회원가입
            </Button>
            <BottomText>
              회원가입을 클릭하면 써클인의 <B>이용약관</B>에 동의하는 것입니다.
            </BottomText>
          </Container>
        </SafeAreaView>
      </Page>
    );
  }
}
export default EmailLoginScreen;
