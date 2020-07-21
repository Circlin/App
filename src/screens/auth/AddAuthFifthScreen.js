import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  TextInput,
  HelperText,
  Button,
  Portal,
  ActivityIndicator,
  FAB,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera, faPlus} from '@fortawesome/pro-regular-svg-icons';
import BackHeader from '../../components/BackHeader';
import {ActionSheet, Root} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
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

const ImageContainer = styled.View`
  height: 168px;
  justify-content: center;
  align-items: center;
`;

const PhotoContainer = styled.View`
  width: 168px;
  height: 168px;
  margin: 16px 0;
`;

const EmptyPhotoContainer = styled.View`
  position: absolute;
  width: 168px;
  height: 168px;
  border-radius: 84px;
  background-color: rgba(0, 0, 0, 0.12);
  justify-content: center;
  align-items: center;
`;

class AddAuthFifthScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    uid: '',
    uri: '',
    uploadState: false,
    uploadSuccess: false,
  };
  componentDidMount() {
    this.setState(
      {
        uid: this.props.route.params.uid,
      },
      () => {},
    );
  }
  onClickAddImage = () => {
    const BUTTONS = ['촬영', '앨범에서 선택', '취소'];

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: 'Select a Photo',
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.takePhotoFromCamera();
            break;
          case 1:
            this.choosePhotoFromLibrary();
            break;
          default:
            break;
        }
      },
    );
  };
  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      this.onSelectedImage(image);
      this.setState({uri: image.path, uploadState: true});
    });
  };
  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      this.onSelectedImage(image);
      this.setState({uri: image.path, uploadState: true});
    });
  };
  onSelectedImage = async (image) => {
    var data = new FormData();
    data.append('file', {
      uri: image.path,
      name: 'profile.jpg',
      type: 'image/jpg',
    });
    data.append('uid', this.state.uid);
    await fetch('https://www.circlin.co.kr/circlinApi/v2/profileImg.php', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 200) {
          this.setState({
            uploadSuccess: true,
          });
        }
      });
  };
  render() {
    return (
      <Root>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <BackHeader navigation={this.props.navigation} />
          <Container>
            <TitleContainer>
              <Title>프로필 사진 등록</Title>
              <SubTitle>
                다른 회원들에게 보여질{'\n'}당신의 사진을 등록해 주세요.
              </SubTitle>
            </TitleContainer>
            <ImageContainer>
              <PhotoContainer>
                <EmptyPhotoContainer>
                  <FontAwesomeIcon
                    icon={faCamera}
                    size={40}
                    color="rgba(0,0,0,0.26)"
                  />
                </EmptyPhotoContainer>
                <Image
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                  }}
                  resizeMode="cover"
                  source={{uri: this.state.uri ? this.state.uri : null}}
                />
                <FAB
                  style={{position: 'absolute', bottom: 8, right: 8}}
                  small
                  icon={() => (
                    <FontAwesomeIcon icon={faPlus} size={24} color="#ffffff" />
                  )}
                  onPress={() => this.onClickAddImage()}
                />
              </PhotoContainer>
            </ImageContainer>
          </Container>
          <ButtonBottomContainer>
            <Button
              mode="contained"
              onPress={() => {
                this.props.navigation.navigate('추가정보입력여섯번째', {
                  uid: this.state.uid,
                });
              }}
              contentStyle={{height: 52}}>
              다음으로
            </Button>
          </ButtonBottomContainer>
        </SafeAreaView>
      </Root>
    );
  }
}
export default AddAuthFifthScreen;
