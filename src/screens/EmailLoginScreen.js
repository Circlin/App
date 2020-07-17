import React, {Component} from 'react';
import {TextInput, Button, HelperText} from 'react-native-paper';

class EmailLoginScreen extends Component {
  state = {
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
  render() {
    return (
      <>
        <TextInput
          label="이메일"
          mode="flat"
          autoCapitalize={false}
          value={this.state.email}
          onChangeText={(text) => {
            this.setState({email: text});
            this.checkEmail(text);
          }}
        />
        <HelperText type="error" visible={this.state.emailCheck}>
          이메일 형식으로 입력해주세요
        </HelperText>
        <TextInput
          label="비밀번호"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => {
            this.setState({password: text});
            this.checkPassword(text);
          }}
        />
        <HelperText type="error" visible={this.state.passwordCheck}>
          패스워드는 영+숫자 포함 6~12자리로 입력주세요
        </HelperText>
        <Button
          mode="contained"
          color="#ffffff"
          onPress={() => {}}
          style={{borderRadius: 4}}
          contentStyle={{height: 50}}>
          로그인
        </Button>
      </>
    );
  }
}
export default EmailLoginScreen;
