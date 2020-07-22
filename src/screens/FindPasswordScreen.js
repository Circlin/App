import React, {Component} from 'react';
import {TextInput, HelperText, Button} from 'react-native-paper';
import styled from 'styled-components/native';
import BackHeader from '../components/header/BackHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

const API_URL = 'https://www.circlin.co.kr/circlinApi/v3/';

const Bold = styled.Text``;
const B = (props) => <Bold style={{fontWeight: 'bold'}}>{props.children}</Bold>;


const Container = styled.View`
  flex: 1;
  padding: 0 24px;
`;

const TitleContainer = styled.View`
  padding: 16px 0;
  margin-bottom: 24px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const SubTitle = styled.Text`
  font-size: 14px;
  margin-top: 8px;
`;

const InputContainer = styled.View`
  width: 100%;
  flex-direction: row;
`;


const TextButtonContainer = styled.View`
  margin-top: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

class EmailLoginScreen extends Component {
  state = {
    email: '',
    emailCheck: false,
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
  findPassword = () => {
    fetch(API_URL + 'user/find', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.resPonseCode == 200) {
          alert(
            '가입하신 이메일로 임시 비밀번호를 발송하였습니다. 로그인 후 반드시 비밀번호를 변경해주세요',
          );
          this.props.navigation.navigate('로그인');
        }
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <BackHeader navigation={this.props.navigation} />
          <Container>
            <TitleContainer>
              <Title>비밀번호 찾기</Title>
              <SubTitle>
                가입하신 이메일 주소를 입력하시면{'\n'}새 비밀번호를 발송해
                드립니다.
              </SubTitle>
            </TitleContainer>
            <TextInput
              label="이메일"
              style={{backgroundColor: '#ffffff', paddingHorizontal: 0, height: 56,}}
              dense={true}
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
            <Button
              mode="contained"
              onPress={() => {
                this.findPassword();
              }}
              disabled={
                !this.state.emailCheck && this.state.email ? false : true
              }
              style={{marginTop: 16}}
              contentStyle={{height: 50}}>
              새 비밀번호 발송하기
            </Button>
          </Container>
        </SafeAreaView>
    );
  }
}
export default EmailLoginScreen;
