import React, {Component} from 'react';
import {TextInput, HelperText, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import BackHeader from '../../components/header/BackHeader';

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

const ButtonBottomContainer = styled.View`
  padding: 8px 16px;
`;

class AddProfile02Screen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.setState({
      uid: this.props.route.params.uid,
    });
  }
  state = {
    uid: '',
    buttonDisabled: true,
    nickName: '',
    errorMessage: '',
  };
  checkNickName = (text) => {
    var regId = /^[A-Za-z0-9]{4,12}$/;
    if (regId.test(text)) {
      this.setState({errorMessage: ''});
      this.confirmNickNameYn(text);
    } else {
      this.setState({
        errorMessage: '닉네임은 영문,숫자 4~12자리까지 가능합니다',
      });
    }
  };
  confirmNickNameYn = (text) => {
    fetch(API_URL + 'user/Nick/' + text, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.resPonseCode == 200) {
          this.setState({
            errorMessage: '',
            buttonDisabled: false,
          });
        } else {
          this.setState({
            errorMessage: '중복 된 닉네임입니다.',
            buttonDisabled: true,
          });
        }
      });
  };
  nextScreen = async () => {
    this.setState({
      animate: true,
    });
    const {uid, nickName} = this.state;
    await fetch(API_URL + 'user/Nick', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        nickName: nickName,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.resPonseCode == 200) {
          this.props.navigation.navigate('AddProfile03', {
            uid: uid,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <BackHeader navigation={this.props.navigation} />
        <Container>
          <TitleContainer>
            <Title>닉네임 만들기</Title>
            <SubTitle>
              앞으로 써클인에서 이용하실{'\n'}나만의 닉네임을 만들어 주세요.
            </SubTitle>
          </TitleContainer>
          <TextInput
            label="닉네임"
            style={{
              backgroundColor: '#ffffff',
              paddingHorizontal: 0,
              height: 56,
            }}
            dense={true}
            value={this.state.nickName}
            autoCapitalize="none"
            onChangeText={(text) => {
              this.setState({nickName: text});
              this.checkNickName(text);
            }}
          />
          <HelperText
            type="error"
            padding="none">
            {this.state.errorMessage}
          </HelperText>
        </Container>
        <ButtonBottomContainer>
          <Button
            mode="contained"
            disabled={this.state.buttonDisabled}
            onPress={() => {
              this.nextScreen();
            }}
            contentStyle={{height: 52}}>
            다음으로
          </Button>
        </ButtonBottomContainer>
      </SafeAreaView>
    );
  }
}
export default AddProfile02Screen;
