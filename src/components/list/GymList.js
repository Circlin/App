import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {List, Button} from 'react-native-paper';
import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBuilding} from '@fortawesome/pro-regular-svg-icons';

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

export default class GymList extends Component {
  get image() {
    return this.props.photo ? (
      <Image source={{uri: this.props.photo}} style={[styles.photo]} />
    ) : (
      <IconContainer>
        <FontAwesomeIcon
          icon={faBuilding}
          size={20}
          color="#262828"
          style={[styles.icon]}
        />
      </IconContainer>
    );
  }
  render() {
    return (
      <List.Item
        style={[styles.container]}
        titleStyle={[styles.title]}
        descriptionStyle={[styles.description]}
        title={this.props.title}
        description={this.props.description}
        onPress={this.props.listOnPress}
        left={() => <LeftContainer>{this.image}</LeftContainer>}
        right={(props) => (
          <RightContainer {...props}>
            <Button
              mode="contained"
              onPress={() => {}}
              ContentStyle={{paddingHorizontal: 0}}
              style={{minWidth: 0}}
              labelStyle={{}}
              onPress={this.props.buttonOnPress}>
              지도
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
