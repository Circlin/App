import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Portal, Dialog, Button, Searchbar} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/pro-regular-svg-icons';
import styled from 'styled-components/native';
import GymList from '../list/GymList';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const Container = styled.View`
  flex: 1;
`;

const Picker = styled.TouchableOpacity`
  height: 56px;
  justify-content: center;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.32);
`;

const Placeholder = styled.Text`
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
`;

const ScrollMargin = styled.View`
  height: 8px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

class GymPicker extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    this.setState({
      facil: this.props.data,
    });
  }

  state = {
    text: '',
    gym: '운동시설을 검색해 보세요',
    facil: [],
    lat: 0,
    lng: 0,
    //검색 위해서 추가된 state
    firstQuery: '',
  };
  changeGym(value, value2) {
    this.gymDialogHide();
    this.props.selectFacils(value, value2);
    this.setState({gym: value});
  }

  gymDialogShow = () => {
    this.setState({gymDialogVisible: true});
  };

  gymDialogHide = () => {
    this.setState({gymDialogVisible: false});
  };

  mapDialogShow = () => {
    this.setState({mapDialogVisible: true});
  };

  mapDialogHide = () => {
    this.setState({mapDialogVisible: false});
  };
  setMap = (value1, value2) => {
    console.log(value1);
    this.setState(
      {
        lat: value1,
        lng: value2,
      },
      this.mapDialogShow(),
    );
  };
  textChange = (text) => {
    this.setState({firstQuery: text});
    this.props.searchText(text);
  };
  render() {
    //검색 위해서 firstQuery 추가
    const {
      gym,
      gymDialogVisible,
      mapDialogVisible,
      facil,
      firstQuery,
    } = this.state;

    //  console.log(facilsList);
    return (
      <Container>
        <Picker activeOpagym={1} onPress={this.gymDialogShow}>
          <Placeholder>{gym ? gym : 'Select gym'}</Placeholder>
        </Picker>
        <Portal>
          <Dialog
            style={[styles.dialog]}
            visible={gymDialogVisible}
            onDismiss={this.gymDialogHide}>
            {/* S : 검색 위해서 추가된 부분 */}
            <Dialog.Content style={{backgroundColor: 'transparent'}}>
              <Searchbar
                placeholder="시설이름 또는 주소"
                onChangeText={(query) => {
                  this.textChange(query);
                }}
                value={this.props.selectFacils}
                onIconPress={() => {
                  this.props._searchFacils();
                }}
                handleClearPress={() => {
                  console.log(11);
                }}
              />
            </Dialog.Content>
            {/* 여기 props중에서 왼쪽 클릭할때 onIconPress={() => {
              alert(1)
            }}*/}
            {/* E : 검색 위해서 추가된 부분 */}
            <Dialog.ScrollArea style={[styles.dialogScrollArea]}>
              <ScrollView>
                <ScrollMargin />
                {this.props.data.map((data) => {
                  return (
                    <GymList
                      key={data.CUSTCD}
                      title={data.CUSTNAME}
                      description={data.ADDRDETAIL1}
                      LAT={data.Y}
                      LNG={data.X}
                      photo={data.PARTNER_LOGO_DIR}
                      listOnPress={this.changeGym.bind(
                        this,
                        data.CUSTNAME,
                        data.CUSTCD,
                      )}
                      buttonOnPress={this.setMap.bind(this, data.Y, data.X)}
                    />
                  );
                })}
                <ScrollMargin />
              </ScrollView>
            </Dialog.ScrollArea>
            <ButtonContainer>
              <Button
                mode="contained"
                style={[styles.button]}
                contentStyle={[styles.buttonContent]}
                onPress={this.gymDialogHide}>
                닫기
              </Button>
            </ButtonContainer>
          </Dialog>
          <Dialog
            style={[styles.dialogMap]}
            visible={mapDialogVisible}
            onDismiss={this.mapDialogHide}>
            <Dialog.Content style={[styles.dialogMapContent]}>
              <View style={{flex: 1}}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{flex: 1}}
                  initialRegion={{
                    latitude: Number(this.state.lat),
                    longitude: Number(this.state.lng),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}>
                  <Marker
                    coordinate={{
                      latitude: Number(this.state.lat),
                      longitude: Number(this.state.lng),
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    title={this.state.title}
                    onCalloutPress={this.clickCallout}
                  />
                </MapView>
              </View>
            </Dialog.Content>
            <ButtonContainer>
              <Button
                mode="contained"
                style={[styles.button]}
                contentStyle={[styles.buttonContent]}
                onPress={this.mapDialogHide}>
                닫기
              </Button>
            </ButtonContainer>
          </Dialog>
        </Portal>
      </Container>
    );
  }
}

export default GymPicker;

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
    borderRadius: 8,
    maxHeight: 0.8 * Dimensions.get('window').height,
  },
  dialogMap: {
    flex: 1,
    borderRadius: 8,
    maxHeight: 0.5 * Dimensions.get('window').height,
    marginHorizontal: 48,
  },
  dialogScrollArea: {
    flex: 1,
    paddingHorizontal: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  dialogMapContent: {
    flex: 1,
  },
  button: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonContent: {
    height: 48,
  },
});
