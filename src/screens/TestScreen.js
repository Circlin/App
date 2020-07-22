import React, {Component} from 'react';
import {Portal, Button} from 'react-native-paper';
import {View, Text, SafeAreaView} from 'react-native';
import Fab from '../components/fab/Fab';
import FeedHeader from '../components/header/FeedHeader';
import {getData} from '../common/index';
class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
    };
  }
  async componentDidMount() {
    let uid = await getData('uid');
    this.setState({
      uid: uid,
    });
  }

  render() {
    return (
      <>
        <FeedHeader />
        <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
          <Button
            onPress={() => {
              this.props.navigation.navigate('추가정보입력일곱번째', {
                uid: this.state.uid,
              });
            }}>
            뒤로
          </Button>
        </SafeAreaView>
        <Portal>
          <Fab />
        </Portal>
      </>
    );
  }
}

export default TestScreen;
