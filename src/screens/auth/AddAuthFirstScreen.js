import React, {Component} from 'react';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import BackHeader from '../../components/header/BackHeader';
import TribeCarousel from '../../components/TribeCarousel';
import {getData, tribeToCode} from '../../common/index';

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

class AddAuthFirstScreen extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.setState({
      uid: await getData('uid'),
    });
  }
  state = {
    selectItem: '',
    uid: '',
  };
  getIndex = (item) => {
    this.setState({
      selectItem: item,
    });
  };
  nextScreen = async () => {
    const {uid, selectItem} = this.state;
    await fetch(API_URL + 'tribe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        tribe: tribeToCode(selectItem),
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.resPonseCode == 200) {
          this.props.navigation.navigate('추가정보입력두번째', {
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
        <Container style={{justifyContent: 'space-between'}}>
          <TitleContainer>
            <Title>종족 선택(가제)</Title>
            <SubTitle>(이 부분의 내용은{'\n'}바꿔야 합니다)</SubTitle>
          </TitleContainer>
          <TribeCarousel
            navigation={this.props.navigation}
            getIndex={this.getIndex.bind(this)}
          />
        </Container>
        <ButtonBottomContainer>
          <Button
            mode="contained"
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

export default AddAuthFirstScreen;
