import React, {Component} from 'react';
import {TextInput, Button, FAB} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPen, faSearch} from '@fortawesome/pro-regular-svg-icons';
import styled from 'styled-components/native';
import BackHeader from '../../components/BackHeader';
import GymPicker from '../../components/picker/GymPicker';

const Bold = styled.Text``;
const B = (props) => <Bold style={{fontWeight: 'bold'}}>{props.children}</Bold>;
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
  flex-direction: row;
  padding: 8px 16px;
`;

const FontAwesomeIconContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

class AddAuthSixthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.route.params.uid,
      facilsList: [],
      selectFacils: '',
      writeFacils: '',
    };
  }

  async componentDidMount() {
    await this.getMemberShipFacilsList();
  }
  getMemberShipFacilsList = async () => {
    await fetch(API_URL + 'partnerFacils', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.resPonseCode == 200) {
          this.setState({
            facilsList: result.data,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  selectFacils = (item) => {
    this.setState({
      selectFacils: item,
      writeFacils: '',
    });
  };
  render() {
    const {facilsList} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <BackHeader navigation={this.props.navigation} />
        <Container>
          <TitleContainer>
            <Title>운동장소 입력(선택)</Title>
            <SubTitle>
              당신이 주로 운동하시는 운동시설{'\n'}혹은 장소를 입력해 주세요.
            </SubTitle>
          </TitleContainer>
          <InputContainer>
            <GymPicker
              navigation={this.props.navigation}
              data={facilsList}
              selectFacils={this.selectFacils.bind(this)}
            />

            <FAB
              style={{marginLeft: 8, marginVertical: 8}}
              small
              icon={() => (
                <FontAwesomeIconContainer>
                  <FontAwesomeIcon icon={faSearch} size={20} color="#ffffff" />
                </FontAwesomeIconContainer>
              )}
              onPress={() => console.log('Pressed')}
            />
          </InputContainer>
          <InputContainer>
            <TextInput
              label=""
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                paddingHorizontal: 0,
                height: 56,
              }}
              dense={true}
              value={this.state.writeFacils}
              onChangeText={(text) => {
                this.setState({
                  writeFacils: text,
                  selectFacils: '',
                });
              }}
              placeholder="운동시설을 직접 입력해 주세요"
              autoCapitalize="none"
            />
            <FAB
              style={{marginLeft: 8, marginVertical: 8}}
              small
              icon={() => (
                <FontAwesomeIconContainer>
                  <FontAwesomeIcon icon={faPen} size={20} color="#ffffff" />
                </FontAwesomeIconContainer>
              )}
              onPress={() => console.log('Pressed')}
            />
          </InputContainer>
        </Container>
        <ButtonBottomContainer>
          <Button
            mode="contained"
            onPress={() => {
              this.props.navigation.navigate('추가정보입력일곱번째');
            }}
            style={{flex: 1}}
            contentStyle={{height: 52}}>
            다음으로
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              this.props.navigation.navigate('바텀탭');
            }}
            style={{backgroundColor: 'rgba(0,0,0,0.54)', marginLeft: 8}}
            contentStyle={{height: 52}}>
            건너뛰기
          </Button>
        </ButtonBottomContainer>
      </SafeAreaView>
    );
  }
}
export default AddAuthSixthScreen;
