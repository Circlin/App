import React, {Component} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native-paper';

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
`;

class CircleIndicator extends Component {
  render() {
    return (
      <Container>
        <ActivityIndicator animating={this.props.animate} />
      </Container>
    );
  }
}

export default CircleIndicator;
