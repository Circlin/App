import React, {Component} from 'react';
import {TextInput, Button, FAB} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPen, faSearch} from '@fortawesome/pro-regular-svg-icons';
import styled from 'styled-components/native';
import BackHeader from '../../components/header/BackHeader';
import GymPicker from '../../components/picker/GymPicker';

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
  flex-direction: row;
  padding: 8px 16px;
`;

const FontAwesomeIconContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

class AddProfile06Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.route.params.uid,
      facilsList: [],
      selectFacils: '',
      searchFacils: '',
      facilsKey: '',
      writeFacils: '',
      selectFlag: true,
      buttonDisabled: true,
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
  selectFacils = (item, key) => {
    this.setState({
      selectFacils: item,
      facilsKey: key,
      writeFacils: '',
      buttonDisabled: false,
    });
  };
  searchText = (text) => {
    this.setState({
      searchFacils: text,
    });
  };
  _searchFacils = () => {
    console.log(123);
    if (this.state.searchFacils != '') {
      this.setState({animate: true});
      fetch('https://www.circlin.co.kr/circlinApi/v3/facils', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facilName: this.state.searchFacils,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.resPonseCode == 200) {
            this.setState({
              facilsList: responseJson.data,
            });
            this.setState({animate: false});
          } else {
            console.log(responseJson.error);
          }
        });
    }
  };
  nextScreen = async () => {
    const {facilsKey, selectFlag, selectFacils, writeFacils, uid} = this.state;
    await fetch(API_URL + 'user/myFacils', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        myFacilsName: selectFlag ? selectFacils : writeFacils,
        myFacilsKey: facilsKey,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.resPonseCode == 200) {
          this.props.navigation.navigate('AddProfile07', {
            uid: uid,
          });
        }
      })
      .catch((error) => console.log(error));
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
          {this.state.selectFlag ? (
            <InputContainer>
              <GymPicker
                navigation={this.props.navigation}
                data={facilsList}
                text={this.state.searchFacils}
                selectFacils={this.selectFacils.bind(this)}
                searchText={this.searchText.bind(this)}
                _searchFacils={this._searchFacils.bind(this)}
              />

              <FAB
                style={{
                  backgroundColor: '#262828',
                  marginLeft: 8,
                  marginVertical: 8,
                }}
                small
                icon={() => (
                  <FontAwesomeIconContainer>
                    <FontAwesomeIcon icon={faPen} size={20} color="#ffffff" />
                  </FontAwesomeIconContainer>
                )}
                onPress={() => {
                  this.setState({
                    selectFlag: false,
                    buttonDisabled: true,
                  });
                }}
              />
            </InputContainer>
          ) : (
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
                    facilsKey: 'USER',
                    buttonDisabled: false,
                  });
                }}
                placeholder="운동시설을 직접 입력해 주세요"
                autoCapitalize="none"
              />
              <FAB
                style={{
                  backgroundColor: '#262828',
                  marginLeft: 8,
                  marginVertical: 8,
                }}
                small
                icon={() => (
                  <FontAwesomeIconContainer>
                    <FontAwesomeIcon
                      icon={faSearch}
                      size={20}
                      color="#ffffff"
                    />
                  </FontAwesomeIconContainer>
                )}
                onPress={() => {
                  this.setState({
                    selectFlag: true,
                    buttonDisabled: true,
                  });
                }}
              />
            </InputContainer>
          )}
        </Container>
        <ButtonBottomContainer>
          <Button
            mode="contained"
            disabled={this.state.buttonDisabled}
            onPress={() => {
              this.nextScreen();
            }}
            style={{flex: 1}}
            contentStyle={{height: 52}}>
            다음으로
          </Button>
          <Button
            mode="contained"
            color="rgba(0,0,0,0.54)"
            onPress={() => {
              this.props.navigation.navigate('Main');
            }}
            style={{marginLeft: 8}}
            contentStyle={{height: 52}}>
            건너뛰기
          </Button>
        </ButtonBottomContainer>
      </SafeAreaView>
    );
  }
}
export default AddProfile06Screen;
