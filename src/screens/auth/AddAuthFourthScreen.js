import React, {Component} from 'react';
import {
  TextInput,
  HelperText,
  Button,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import BackHeader from '../../components/BackHeader';
import CircleIndicator from '../../components/indicator/CircleIndicator';
import Picker from '../../components/picker/Picker';
import {birth, month, day} from '../../common/index';
const API_URL = 'https://www.circlin.co.kr/circlinApi/v3/';
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
const PickerMargin = styled.View`
  width: 8px;
`;
class AddAuthFourthScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    uid: '',
    birthArray: [],
    monthArray: [],
    dayArray: [],
    birthValue: '',
    monthValue: '',
    dayValue: '',
    buttonDisabled: true,
  };
  componentDidMount() {
    this.setState(
      {
        uid: this.props.route.params.uid,
      },
      () => {
        this.setState({
          birthArray: birth(),
          monthArray: month(),
          dayArray: day(),
        });
      },
    );
  }
  itemSelect = (item, type, key) => {
    if (type == 'birth') {
      this.setState({
        birthValue: {
          key: key,
          label: item,
        },
      });
    } else if (type == 'month') {
      this.setState({
        monthValue: {
          key: key,
          label: item,
        },
      });
    } else if (type == 'day') {
      this.setState({
        dayValue: {
          key: key,
          label: item,
        },
        buttonDisabled: false,
      });
    }
  };
  nextScreen = async () => {
    const {uid, birthValue, monthValue, dayValue} = this.state;
    await fetch(API_URL + 'birth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        birth: birthValue.key + '-' + monthValue.key + '-' + dayValue.key,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.resPonseCode == 200) {
          this.props.navigation.navigate('추가정보입력다섯번째', {
            uid: uid,
          });
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
            <Title>연령 선택</Title>
            <SubTitle>당신의 나이를 입력해 주세요.</SubTitle>
          </TitleContainer>
          <InputContainer>
            <Picker
              placeholder={'태어난해'}
              data={this.state.birthArray}
              itemSelect={this.itemSelect.bind(this)}
              dataType={'birth'}
              value={this.state.birthValue.label}
            />
            <PickerMargin />
            <Picker
              placeholder={'태어난월'}
              data={this.state.monthArray}
              itemSelect={this.itemSelect.bind(this)}
              dataType={'month'}
              value={this.state.monthValue.label}
            />
            <PickerMargin />
            <Picker
              placeholder={'태어난일'}
              data={this.state.dayArray}
              itemSelect={this.itemSelect.bind(this)}
              dataType={'day'}
              value={this.state.dayValue.label}
            />
          </InputContainer>
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
export default AddAuthFourthScreen;
