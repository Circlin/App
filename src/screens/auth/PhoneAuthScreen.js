import React, {Component} from 'react';
import {Platform, ActivityIndicator, View, Text} from 'react-native';
import {TextInput, HelperText, Button} from 'react-native-paper';
import styled from 'styled-components/native';
import BackHeader from '../../components/header/BackHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getData} from '../../../src/common';

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

const PhoneContainer = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 16px;
`;

const CertificationContainer = styled.View`
  width: 100%;
  margin-top: 16px;
`;

class PhoneAuthScreen extends Component {
  static getDefaultState() {
    return {
      error: '',
      codeInput: '',
      phoneNumber: '',
      phoneNumberOriginal: '',
      auto: Platform.OS === 'android',
      autoVerifyCountDown: 0,
      sent: false,
      started: false,
      user: null,
      authCode: '',
      uid: '',
    };
  }

  constructor(props) {
    super(props);
    this.timeout = 180;
    this._autoVerifyInterval = null;
    this.state = PhoneAuthScreen.getDefaultState();
  }
  async componentDidMount() {
    let uid = await getData('uid');
    this.setState({
      uid: uid,
    });
  }
  _tick() {
    if (this.state.autoVerifyCountDown > 0) {
      this.setState({
        autoVerifyCountDown: this.state.autoVerifyCountDown - 1,
      });
    } else {
      this.setState({
        started: false,
        sent: false,
        codeInput: '',
      });
    }
  }
  checkPhoneNumber = (phone) => {
    if (phone.length == 11) {
      let a = phone.replace(
        /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
        '$1-$2-$3',
      );

      this.setState({
        phoneNumber: a,
        phoneNumberOriginal: phone,
      });
    } else {
      this.setState({
        phoneNumber: phone,
      });
    }
  };
  handleSendCode = async () => {
    const {phoneNumberOriginal, uid} = this.state;
    this.setState(
      {
        error: '',
        started: true,
        autoVerifyCountDown: this.timeout,
      },
      async () => {
        await fetch(API_URL + 'authSMS', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: phoneNumberOriginal,
            uid: uid,
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.resPonseCode == 200) {
              this.setState(
                {
                  sent: true,
                  authCode: result.authCode,
                },
                () => {
                  setInterval(this._tick.bind(this), 1000);
                },
              );
            }
          })
          .catch((error) => console.log(error));
      },
    );
  };
  afterVerify = () => {
    const {
      phoneNumberOriginal,
      codeInput,
      uid,
      autoVerifyCountDown,
    } = this.state;
    if (autoVerifyCountDown > 0) {
      this.setState(
        {
          animate: true,
        },
        async () => {
          await fetch(API_URL + 'verifySMS', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              authCode: codeInput,
              phone: phoneNumberOriginal,
              uid: uid,
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              if (result.resPonseCode == 200) {
                this.setState({
                  animate: false,
                  sent: false,
                  autoVerifyCountDown: 0,
                  started: false,
                });
                // this.props.navigation.navigate("이동할페이지")
              }
            })
            .catch((error) => console.log(error));
        },
      );
    }
  };

  render() {
    const {started, error, codeInput, sent, auto, user} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <BackHeader navigation={this.props.navigation} />
        <Container>
          <TitleContainer>
            <Title>본인인증</Title>
          </TitleContainer>
          <PhoneContainer>
            <TextInput
              label=""
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 0,
                height: 48,
                flex: 1,
                marginRight: 16,
              }}
              placeholder="'-'를 제외하고 입력"
              autoCapitalize="none"
              keyboardType="phone-pad"
              value={this.state.phoneNumber}
              onChangeText={(text) => {
                this.checkPhoneNumber(text);
              }}
              textContentType="oneTimeCode"
            />
            <Button
              mode="contained"
              contentStyle={{height: 48}}
              disabled={this.state.phoneNumberOriginal != '' ? false : true}
              onPress={() => {
                this.handleSendCode();
              }}>
              인증 요청
            </Button>
          </PhoneContainer>
          <HelperText type="error" padding="none" visible={false} />
          {this.state.sent ? (
            <Text style={{fontSize: 10}}>
              {this.state.autoVerifyCountDown > 0
                ? `인증번호가 발송되었습니다. 제한시간 안에 인증번호를 입력해주세요(${parseInt(
                    (this.state.autoVerifyCountDown % 3600) / 60,
                  )}분 ${this.state.autoVerifyCountDown % 60}초)`
                : '요청시간이 만료되었습니다 다시 인증번호를 요청하세요'}
            </Text>
          ) : null}
          {!user && started && sent ? (
            <CertificationContainer>
              <TextInput
                label=""
                autoFocus
                style={{backgroundColor: '#ffffff', paddingHorizontal: 0}}
                autoCapitalize="none"
                placeholder="인증번호 입력"
                value={codeInput}
                onChangeText={(text) => {
                  this.setState({codeInput: text});
                }}
                textContentType="oneTimeCode"
                keyboardType="phone-pad"
              />
              <HelperText type="error" padding="none">
                인증번호가 올바르지 않습니다.
              </HelperText>
              <Button
                mode="contained"
                onPress={() => {
                  this.afterVerify();
                }}
                disabled={this.state.codeInput ? false : true}
                style={{marginTop: 16}}
                contentStyle={{height: 50}}>
                확인
              </Button>
            </CertificationContainer>
          ) : null}
        </Container>
      </SafeAreaView>
    );
  }
}
export default PhoneAuthScreen;
