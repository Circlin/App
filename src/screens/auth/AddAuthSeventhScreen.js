import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import BackHeader from '../../components/header/BackHeader';
import MateList from '../../components/list/MateList';
import {PermissionsAndroid, Platform} from 'react-native';
import Contacts from 'react-native-contacts';
import {codeToTribe} from '../../common/index';
const API_URL = 'https://www.circlin.co.kr/circlinApi/v3/';

const Container = styled.ScrollView`
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

const ButtonBottomContainer = styled.View`
  flex-direction: row;
  padding: 8px 16px;
`;

const Section = styled.View`
  margin-top: 24px;
  margin-left: -24px;
  margin-right: -24px;
  margin-bottom: 40px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 16px;
`;

const dummy = [
  {
    key: '1',
    name: '메이트이름1',
    address: '메이트주소1',
    tribe: '메이트종족1',
    photo:
      'https://cyld2018.speedgabia.com//Image/profile/23310/23310_1595223119.jpg',
  },
  {
    key: '2',
    name: '메이트이름2',
    address: '메이트주소2',
    tribe: '메이트종족2',
    photo:
      'https://cyld2018.speedgabia.com//Image/profile/12260/12260_1584708319.jpg',
  },
  {
    key: '3',
    name: '메이트이름3',
    address: '메이트주소3',
    tribe: '메이트종족3',
    photo:
      'https://cyld2018.speedgabia.com//Image/profile/22311/22311_1594172624.jpeg',
  },
  {
    key: '4',
    name: '메이트이름4',
    address: '메이트주소4',
    tribe: '메이트종족4',
    photo:
      'https://cyld2018.speedgabia.com//Image/profile/18410/18410_1590039043.jpeg',
  },
  {
    key: '5',
    name: '메이트이름5',
    address: '메이트주소5',
    tribe: '메이트종족5',
    photo:
      'https://cyld2018.speedgabia.com//Image/profile/15683/15683_1586924258.jpg',
  },
];

class AddAuthSeventhScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      contactList: [],
      contactMateList: [],
      aiMateList: [],
    };
  }
  componentDidMount() {
    this.setState(
      {
        uid: this.props.route.params.uid,
      },
      () => {
        if (Platform.OS == 'ios') {
          Contacts.checkPermission((err, result) => {
            console.log(result);
            if (result == 'undefined') {
              Contacts.requestPermission((result) => {});
            } else if (result == 'authorized') {
              this.getContacts();
            }
          });
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: '연락처',
              message: '써클인 앱에서 친구를 찾기위해 연락처를 수집합니다',
              buttonPositive: '확인',
            },
          ).then(() => {
            // this.getContacts();
          });
        }
      },
    );
  }
  getContacts = async () => {
    const {uid} = this.state;
    if (Platform.OS == 'android') {
      await Contacts.getAllWithoutPhotos((err, result) => {
        result.map((contact, index) => {
          if (contact.givenName && contact.phoneNumbers[0]) {
            console.log(contact.phoneNumbers[0].number);
          }
        });
      });
    } else {
      await Contacts.getAllWithoutPhotos((err, result) => {
        var contactArr = [];
        result.map((contact, index) => {
          if (contact.givenName && contact.phoneNumbers[0]) {
            let changeNumber;
            if (contact.phoneNumbers[0].number.includes('-')) {
              changeNumber = contact.phoneNumbers[0].number.replace(/-/gi, '');
            } else {
              changeNumber = contact.phoneNumbers[0].number;
            }
            if (changeNumber.includes('+82')) {
              changeNumber = changeNumber.replace('+82', '');
            }
            if (changeNumber.includes('//')) {
              changeNumber = changeNumber.replace('//', '');
            }
            if (changeNumber.includes('\n')) {
              changeNumber = changeNumber.replace(/\s/gi, '');
            }

            contactArr.push({
              uid: uid,
              phone: changeNumber,
            });
          }
        });
        this.getMatefromContacts(contactArr);
      });
    }
  };
  getMatefromContacts = async (contactArr) => {
    await fetch(API_URL + 'contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: this.state.uid,
        contactList: contactArr,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.resPonseCode == 200) {
          this.setState({
            contactMateList: result.data,
            aiMateList: result.data2,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  render() {
    const {contactMateList, uid, aiMateList} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <BackHeader navigation={this.props.navigation} />
        <Container>
          <TitleContainer>
            <Title>추천 메이트</Title>
            <SubTitle>메이트 설명, 혜택{'\n'}왜 5명이 추천되는지?</SubTitle>
          </TitleContainer>
          {contactMateList ? (
            <Section>
              <SectionTitle>알 수도 있는 메이트</SectionTitle>
              {contactMateList.map((item) => {
                return (
                  <MateList
                    key={item._ID}
                    name={item.NICKNAME}
                    address={item.CITY + ' ' + item.COUNTY}
                    tribe={item.TRIBE_NM}
                    photo={item.PROFILE_IMG}
                    target={item._ID}
                    followYn={'N'}
                    uid={uid}
                  />
                );
              })}
            </Section>
          ) : (
            <Section>
              <SectionTitle>연락처에 써클러가 없습니다</SectionTitle>
            </Section>
          )}
          <Section>
            <SectionTitle>추천 메이트</SectionTitle>
            {aiMateList.map((item) => {
              return (
                <MateList
                  key={item._ID}
                  name={item.NICKNAME}
                  address={item.CITY + ' ' + item.COUNTY}
                  tribe={item.TRIBE_NM}
                  photo={item.PROFILE_IMG}
                  target={item._ID}
                  followYn={'N'}
                  uid={uid}
                />
              );
            })}
          </Section>
        </Container>
        <ButtonBottomContainer>
          <Button
            mode="contained"
            onPress={() => {
              this.props.navigation.navigate('추가정보입력여덟번째');
            }}
            style={{flex: 1}}
            contentStyle={{height: 52}}>
            다음으로
          </Button>
          <Button
            mode="contained"
            color="rgba(0,0,0,0.54)"
            onPress={() => {
              this.props.navigation.navigate('바텀탭');
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
export default AddAuthSeventhScreen;
