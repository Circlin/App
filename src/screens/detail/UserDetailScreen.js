import React, {Component} from 'react';
import {Button} from 'react-native-paper';
import {View, Text, SafeAreaView} from 'react-native';
import BackHeader from '../../components/header/BackHeader';

class UserDetailScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <BackHeader navigation={this.props.navigation} />
            <View>
                <Text>유저</Text>
            </View>
        </SafeAreaView>
    );
  }
}

export default UserDetailScreen;
