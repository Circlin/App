import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import RootStack from './navigation/RootStack';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#262828',
    accent: '#ff5733',
    background: '#ffffff',
    text: '#262828',
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
