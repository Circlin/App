import React, {Component} from 'react';
import {Button} from 'react-native-paper';
import {View, Text, SafeAreaView} from 'react-native';

class TestScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <SafeAreaView>
        <Button
          onPress={() => {
            this.props.navigation.navigate('로그인');
          }}>
          뒤로
        </Button>
      </SafeAreaView>
    );
  }
}

export default TestScreen;
