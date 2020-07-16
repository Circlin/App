import React, {Component} from 'react';
import {TextInput,Button} from 'react-native-paper';

class EmailLoginScreen extends Component {
  state = {
    text: '',
  };
  render() {
    return (
      <>
        <TextInput
          label="이메일"
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput
          label="비밀번호"
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          mode="contained"
          color="#ffffff"
          onPress={() => {
        
          }}
          style={{borderRadius: 4}}
          contentStyle={{height: 50}}>
          로그인
        </Button>
      </>
    );
  }
}
export default EmailLoginScreen;
