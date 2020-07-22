import React, {Component} from 'react';
import {Image} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import BackHeader from '../../components/header/BackHeader';

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

const ButtonBottomContainer = styled.View`
  flex-direction: row;
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
    border-width: 2px;
    border-color: #262828;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
    color: #ffffff;
`;

class AddAuthEighthScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <BackHeader navigation={this.props.navigation} />
        <Container>
          <TitleContainer>
            <Title>완료되었습니다!</Title>
            <SubTitle>기록 시스템과{'\n'}포인트 설명</SubTitle>
          </TitleContainer>
          <ImageContainer>
            <PhotoContainer>
              <EmptyPhotoContainer></EmptyPhotoContainer>
            </PhotoContainer>
          </ImageContainer>
        </Container>
        <ButtonBottomContainer>
          <Button
            mode="contained"
            onPress={() => {
              this.props.navigation.navigate('추가정보입력여덟번째');
            }}
            style={{flex: 1}}
            contentStyle={{height: 52}}>
            첫 글 쓰러가기 <B>(+ 500포인트)</B>
          </Button>
          <Button
            mode="contained"
            color="rgba(0,0,0,0.54)"
            onPress={() => {
              this.props.navigation.navigate('바텀탭');
            }}
            style={{marginLeft: 8}}
            contentStyle={{height: 52}}>
            홈으로
          </Button>
        </ButtonBottomContainer>
      </SafeAreaView>
    );
  }
}
export default AddAuthEighthScreen;
