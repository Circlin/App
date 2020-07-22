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
import BackHeader from '../../components/header/BackHeader';
import Picker from '../../components/picker/Picker';

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
const PickerMargin = styled.View`
  width: 8px;
`;

const ButtonBottomContainer = styled.View`
  padding: 8px 16px;
`;

class AddAuthThirdScreen extends Component {
  state = {
    uid: '',
    cityArray: [],
    countyArray: [],
    dongArray: [],
    city: '',
    county: '',
    buttonDisabled: true,
  };
  async componentDidMount() {
    this.setState(
      {
        uid: this.props.route.params.uid,
      },
      async () => {
        await fetch(API_URL + 'getCity', {
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
                cityArray: result.data,
                countyArray: [],
                dongArray: [],
              });
            }
          })
          .catch((error) => console.log(error));
      },
    );
  }
  itemSelect = (item, type, key) => {
    if (type == 'city') {
      this.countyArray(key);
      this.setState({
        cityName: item,
        buttonDisabled: true,
      });
    }
    if (type == 'county') {
      this.dongArray(key);
      this.setState({
        countyName: item,
        buttonDisabled: true,
      });
    }
    if (type == 'dong') {
      this.setState({
        dongName: item,
        buttonDisabled: false,
      });
    }
  };
  countyArray = async (key) => {
    await fetch(API_URL + 'getCounty', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        largcd: key,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.resPonseCode == 200) {
          this.setState({
            countyArray: result.data,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  dongArray = async (key) => {
    await fetch(API_URL + 'getDong', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        midcd: key,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.resPonseCode == 200) {
          this.setState({
            dongArray: result.data,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  nextScreen = async () => {
    const {uid, cityName, countyName, dongName} = this.state;
    await fetch(API_URL + 'address', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        cityName: cityName,
        countyName: countyName,
        dongName: dongName,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.resPonseCode == 200) {
          this.props.navigation.navigate('추가정보입력네번째', {
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
            <Title>지역 선택</Title>
            <SubTitle>당신이 앞으로 보일{'\n'}지역을 선택해 주세요.</SubTitle>
          </TitleContainer>
          <InputContainer>
            <Picker
              placeholder={'시'}
              data={this.state.cityArray}
              itemSelect={this.itemSelect.bind(this)}
              dataType={'city'}
              value={this.state.cityName}
            />
            <PickerMargin />
            <Picker
              placeholder={'군/구'}
              data={this.state.countyArray}
              itemSelect={this.itemSelect.bind(this)}
              dataType={'county'}
              value={this.state.countyName}
              clickable={this.state.cityName ? 'auto' : 'none'}
            />
            <PickerMargin />
            <Picker
              placeholder={'동/면/읍'}
              data={this.state.dongArray}
              itemSelect={this.itemSelect.bind(this)}
              dataType={'dong'}
              value={this.state.dongName}
              clickable={this.state.countyName ? 'auto' : 'none'}
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
export default AddAuthThirdScreen;
