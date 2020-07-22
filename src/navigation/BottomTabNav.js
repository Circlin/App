import React, {Component} from 'react';
import {Portal} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBrowser,
  faGlobe,
  faDatabase,
  faUser,
} from '@fortawesome/pro-regular-svg-icons';
import TestScreen from '../screens/TestScreen'
import TestScreen2 from '../screens/TestScreen2';
import Fab from '../components/fab/Fab';

const Tab = createMaterialBottomTabNavigator();

class BottomTabNav extends Component {
  render() {
    return (
      <React.Fragment>
        <Tab.Navigator
          activeColor="#262828"
          inactiveColor="#92ABB8"
          labeled={false}
          barStyle={{backgroundColor: '#ffffff'}}>
          <Tab.Screen
            name="홈"
            component={TestScreen}
            options={{
              tabBarIcon: ({color}) => (
                <FontAwesomeIcon icon={faBrowser} size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="마이페이지"
            component={TestScreen}
            options={{
              tabBarIcon: ({color}) => (
                <FontAwesomeIcon icon={faUser} size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="탐색"
            component={TestScreen2}
            options={{
              tabBarIcon: ({color}) => (
                <FontAwesomeIcon icon={faGlobe} size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </React.Fragment>
    );
  }
}

export default BottomTabNav;
