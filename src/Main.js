import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import RootStack from './navigation/RootStack';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    accent: '#ff5733',
  },
};

class Main extends Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <RootStack route={this.props.route} />
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

export default Main;
