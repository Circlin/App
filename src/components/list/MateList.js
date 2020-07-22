import React, {Component} from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {List, Button} from 'react-native-paper';
import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/pro-regular-svg-icons';
const API_URL = 'https://www.circlin.co.kr/circlinApi/v3/';
const DescriptionContainer = styled.View`
  flex-direction: row;
`;

const Address = styled.Text``;

const DescriptionDivider = styled.Text`
  margin: 0 4px;
`;

const Tribe = styled.Text``;

const LeftContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const IconContainer = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border-width: 2px;
  border-color: #262828;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 16px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
`;

export default class MateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followYn: 'N',
    };
  }
  get image() {
    return this.props.photo ? (
      <Image source={{uri: this.props.photo}} style={[styles.photo]} />
    ) : (
      <IconContainer>
        <FontAwesomeIcon
          icon={faUser}
          size={20}
          color="#262828"
          style={[styles.icon]}
        />
      </IconContainer>
    );
  }
  follow = (target, uid, followYn) => {
    if (followYn == 'N') {
      this.insertFollow(uid, target);
    } else {
      this.deleteFollow(uid, target);
    }
  };
  insertFollow = async (uid, target) => {
    console.log(uid, target);
    await fetch(API_URL + 'insertFollow', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        target: target,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.resPonseCode == 200) {
          this.setState({
            followYn: 'Y',
          });
        }
      })
      .catch((error) => console.log(error));
  };
  deleteFollow = async (uid, target) => {
    await fetch(API_URL + 'deleteFollow', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        target: target,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.resPonseCode == 200) {
          this.setState({
            followYn: 'N',
          });
        }
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <List.Item
        style={[styles.container]}
        titleStyle={[styles.title]}
        descriptionStyle={[styles.description]}
        title={this.props.name}
        description={() => (
          <DescriptionContainer>
            <Address>{this.props.address}</Address>
            <DescriptionDivider>/</DescriptionDivider>
            <Tribe>{this.props.tribe}</Tribe>
          </DescriptionContainer>
        )}
        onPress={this.props.listOnPress}
        left={() => <LeftContainer>{this.image}</LeftContainer>}
        right={(props) => (
          <RightContainer {...props}>
            <Button
              mode="contained"
              color={this.state.followYn == 'N' ? '#ff5733' : '#000000'}
              onPress={() => {}}
              style={{minWidth: 0}}
              labelStyle={{marginVertical: 6, marginHorizontal: 12}}
              onPress={this.props.buttonOnPress}>
              <ButtonText
                style={{color: '#ffffff'}}
                onPress={() => {
                  this.follow(
                    this.props.target,
                    this.props.uid,
                    this.state.followYn,
                  );
                }}>
                팔로우
              </ButtonText>
            </Button>
          </RightContainer>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  photo: {
    resizeMode: 'cover',
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  icon: {
    marginRight: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#262828',
  },
});
