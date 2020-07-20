import React, {Component} from 'react';
import {
  TextInput,
  HelperText,
  Button,
  Title,
} from 'react-native-paper';
import styled from 'styled-components/native';
import BackHeader from '../components/BackHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

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

class AddAuthFirstScreen extends Component {
  render() {
    return (
      <Page>
        <SafeAreaView>
          <BackHeader navigation={this.props.navigation} />
          <Container>
            <TitleContainer>
              <Title>종족 선택(가제)</Title>
              <SubTitle>
                (이 부분의 내용은{'\n'}바꿔야 합니다)
              </SubTitle>
            </TitleContainer>
            <TextInput
              label="닉네임"
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 0,
                height: 64,
              }}
              autoCapitalize="none"
              //value={this.state.email}
              //onChangeText={(text) => {
              //this.setState({email: text});
              //this.checkEmail(text);
              //}}
            />
            <HelperText
              type="error"
              //visible={this.state.emailCheck}
              padding="none">
              영문과 숫자가 포함된 3 ~ 10자만 가능합니다.
            </HelperText>
            <Button
              mode="contained"
              onPress={() => {this.props.navigation.navigate("추가정보입력두번째")}}
              //disabled={
              //!this.state.emailCheck &&
              //!this.state.passwordCheck &&
              //this.state.email &&
              //this.state.password
              //? false
              //: true
              //}
              style={{marginTop: 16}}
              contentStyle={{height: 50}}>
              다음
            </Button>
          </Container>
        </SafeAreaView>
      </Page>
    );
  }
}
export default AddAuthFirstScreen;
