import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from 'react-native';
import {List, Colors} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import HomeScreen from '../screens/main/HomeScreen';
import TestScreen2 from '../screens/TestScreen2';
import {bottomPadding} from '../../utils';

const Tab = createBottomTabNavigator();

const NullScreen = () => {
  return null;
};

const bottomTabBarHeight = 60;
const modalItemHeight = 72.5;
const modalItemListPadding = 8;

class MyTabBar extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  state = {
    modalShow: false,
    buttonAnimation: new Animated.Value(0),
    backdropAnimation: new Animated.Value(0),
    modalAnimation: new Animated.Value(0),
  };

  toggleButton = () => {
    const buttonToValue = this.state.open ? 0 : 1;
    const backdropToValue = this.state.open ? 0 : 1;
    const modalToValue = this.state.open
      ? 0
      : -(modalItemHeight * 4 + modalItemListPadding * 2);

    Animated.spring(this.state.buttonAnimation, {
      toValue: buttonToValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    Animated.spring(this.state.backdropAnimation, {
      toValue: backdropToValue,
      useNativeDriver: true,
    }).start();

    Animated.spring(this.state.modalAnimation, {
      toValue: modalToValue,
      useNativeDriver: true,
    }).start();

    this.state.open = !this.state.open;
    if (!this.state.modalShow) {
      this.setState({
        modalShow: !this.state.modalShow,
      });
    } else {
      setTimeout(() => {
        this.setState({
          modalShow: !this.state.modalShow,
        });
      }, 300);
    }
  };

  render() {
    const {state, descriptors, navigation} = this.props;
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    //애니메이션 제어
    const buttonRotation = {
      transform: [
        {
          rotate: this.state.buttonAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
          }),
        },
      ],
    };
    const backdropOpacity = {
      opacity: this.state.backdropAnimation,
    };

    const modalPosition = {
      transform: [
        {
          translateY: this.state.modalAnimation,
        },
      ],
    };

    return (
      <>
        {this.state.modalShow ? (
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => this.toggleButton()}>
              <Animated.View
                style={[styles.backdrop, backdropOpacity]}></Animated.View>
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.modal, modalPosition]}>
              <View style={[styles.modalItemList]}>
                <List.Item
                  style={[styles.modalItemContainer]}
                  titleStyle={[styles.modalItemTitle]}
                  descriptionStyle={[styles.modalItemDescription]}
                  title="운동 기록"
                  description="간단한 설명이 추가되어야 합니다"
                  left={() => (
                    <View style={[styles.modalItemLeftContainer]}>
                      <View style={[styles.modalItemLeft]}>
                        <FontAwesome5Pro
                          name="user"
                          size={32}
                          color={Colors.blueGrey900}
                        />
                      </View>
                    </View>
                  )}
                  onPress={() => this.props.navigation.navigate('Upload', {screen: 'Upload01'})}
                />
                <List.Item
                  style={[styles.modalItemContainer]}
                  titleStyle={[styles.modalItemTitle]}
                  descriptionStyle={[styles.modalItemDescription]}
                  title="운동 기록"
                  description="간단한 설명이 추가되어야 합니다"
                  left={() => (
                    <View style={[styles.modalItemLeftContainer]}>
                      <View style={[styles.modalItemLeft]}>
                        <FontAwesome5Pro
                          name="user"
                          size={32}
                          color={Colors.blueGrey900}
                        />
                      </View>
                    </View>
                  )}
                  onPress={() => this.props.navigation.navigate('Upload', {screen: 'Upload01'})}
                />
                <List.Item
                  style={[styles.modalItemContainer]}
                  titleStyle={[styles.modalItemTitle]}
                  descriptionStyle={[styles.modalItemDescription]}
                  title="운동 기록"
                  description="간단한 설명이 추가되어야 합니다"
                  left={() => (
                    <View style={[styles.modalItemLeftContainer]}>
                      <View style={[styles.modalItemLeft]}>
                        <FontAwesome5Pro
                          name="user"
                          size={32}
                          color={Colors.blueGrey900}
                        />
                      </View>
                    </View>
                  )}
                  onPress={() => this.props.navigation.navigate('Upload', {screen: 'Upload01'})}
                />
                <List.Item
                  style={[styles.modalItemContainer]}
                  titleStyle={[styles.modalItemTitle]}
                  descriptionStyle={[styles.modalItemDescription]}
                  title="운동 기록"
                  description="간단한 설명이 추가되어야 합니다"
                  left={() => (
                    <View style={[styles.modalItemLeftContainer]}>
                      <View style={[styles.modalItemLeft]}>
                        <FontAwesome5Pro
                          name="user"
                          size={32}
                          color={Colors.blueGrey900}
                        />
                      </View>
                    </View>
                  )}
                  onPress={() => this.props.navigation.navigate('Upload', {screen: 'Upload01'})}
                />
              </View>
            </Animated.View>
          </View>
        ) : null}
        <View style={styles.tabBarContainer}>
          <View style={styles.tabBarWrapper}>
            {state.routes.map((route, index) => {
              const {options} = descriptors[route.key];

              const name = route.name;

              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined;

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
              if (options.tabBarButton === 'Upload') {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.toggleButton();
                    }}>
                    <View style={styles.tabBarItem}>
                      <Animated.View
                        style={[styles.UploadButton, buttonRotation]}>
                        <FontAwesome5Pro
                          name="plus"
                          size={24}
                          color={Colors.white}
                        />
                      </Animated.View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }
              {
                return (
                  <TouchableOpacity
                    name={name}
                    accessibilityRole="button"
                    accessibilityStates={isFocused ? ['selected'] : []}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={styles.tabBarItem}>
                    <FontAwesome5Pro
                      name={
                        route.name == 'Feed'
                          ? 'columns'
                          : route.name == 'Store'
                          ? 'shopping-basket'
                          : route.name == 'Mypage'
                          ? 'user'
                          : null
                      }
                      style={{
                        marginBottom: 4,
                        color: isFocused
                          ? Colors.blueGrey900
                          : Colors.blueGrey200,
                      }}
                      size={20}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: isFocused
                          ? Colors.blueGrey900
                          : Colors.blueGrey200,
                      }}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </View>
      </>
    );
  }
}

class BottomTabNav extends Component {
  render() {
    return (
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Feed"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Mate',
          }}
        />
        <Tab.Screen
          name="Store"
          component={TestScreen2}
          options={{
            tabBarLabel: 'Store',
          }}
        />
        <Tab.Screen
          name="Mypage"
          component={TestScreen2}
          options={{
            tabBarLabel: 'My',
          }}
        />
        <Tab.Screen
          name="Fake"
          component={NullScreen}
          options={{
            tabBarButton: 'Upload',
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabNav;

const styles = StyleSheet.create({
  tabBarContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.blueGrey50,
    backgroundColor: Colors.white,
    paddingBottom: bottomPadding,
  },
  tabBarWrapper: {
    height: bottomTabBarHeight,
    flexDirection: 'row',
  },
  tabBarItem: {
    flex: 1,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarItemIcon: {},
  tabBarItemLabel: {
    fontSize: 10,
  },
  //인증하기 버튼
  UploadButton: {
    height: 44,
    width: 44,
    backgroundColor: Colors.deepOrange600,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //모달
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modal: {
    position: 'absolute',
    bottom:
      -(modalItemHeight * 4 + modalItemListPadding * 2) + bottomTabBarHeight,
    width: '100%',
    height: modalItemHeight * 4 + modalItemListPadding * 2 + bottomPadding,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: bottomPadding,
  },
  modalItemList: {
    paddingVertical: modalItemListPadding,
  },
  modalItemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalItemTitle: {},
  modalItemDescription: {},
  modalItemLeftContainer: {
    height: '100%',
    marginHorizontal: 8,
  },
  modalItemLeftContainerCenter: {
    height: '100%',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  modalItemLeft: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: Colors.blueGrey100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
