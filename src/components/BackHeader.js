import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Appbar} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/pro-regular-svg-icons';

class BackHeader extends Component {
  render() {
    return (
      <Appbar.Header style={[styles.header]}>
        <Appbar.Action
          onPress={() => {
            this.props.navigation.goBack();
          }}
          icon={() => (
            <FontAwesomeIcon icon={faChevronLeft} size={24} color="#262828" />
          )}
        />
        <Appbar.Content title={''} subtitle={''} />
      </Appbar.Header>
    );
  }
}

export default BackHeader;

const styles = StyleSheet.create({
  header: {
    height: 54,
    backgroundColor: '#ffffff',
    shadowOpacity: 0,
    elevation: 0,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  content: {
    flex: 1,
  },
});
