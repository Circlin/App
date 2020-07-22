import React, {Component} from 'react';
import {Button} from 'react-native-paper';
import {View, Text, SafeAreaView} from 'react-native';

class TestScreen2 extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#ffffff'}}></SafeAreaView>
    );
  }
}

export default TestScreen2;
