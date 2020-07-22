import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';

const {height} = Dimensions.get('window');

class LoginBg extends Component {
  render() {
    return (
      <Video
        source={require('../assets/ex01.mp4')}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
    );
  }
}

export default LoginBg;

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
});
