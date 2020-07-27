import React, {Component} from 'react';
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors, IconButton} from 'react-native-paper';
import {map, min} from 'lodash';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import MaterialTabs from 'react-native-material-tabs';
import DefaultHeader from './DefaultHeader';

const headerCollapsedHeight = 46;

const statusBarHeight = getStatusBarHeight();
const screenWidth = Dimensions.get('screen').width;
const windowWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;

class CollapsibleTabs extends Component {
  scrolls = [];

  constructor(props) {
    super(props);
    this.headerExpandedHeight = headerCollapsedHeight;
    this.state = {
      scrollY: new Animated.Value(0),
      selectedTab: 0,
    };
  }

  onChangePage(index) {
    const {scrollY} = this.state;
    Animated.timing(scrollY, {
      toValue: min([this.scrolls[index] || 0, this.headerExpandedHeight]),
      duration: 200,
      useNativeDriver: true,
    }).start();

    this.carousel.snapToItem(index);
    this.setState({selectedTab: index});
  }

  render() {
    const {selectedTab, scrollY} = this.state;
    const {collapsibleContent, tabs} = this.props;
    const {headerExpandedHeight} = this;

    console.log(this.props.tabs[0].label);
    console.log('1312312312' + this.state.selectedTab);

    const headerHeight = scrollY.interpolate({
      inputRange: [0, headerExpandedHeight - headerCollapsedHeight],
      outputRange: [0, -(headerExpandedHeight - headerCollapsedHeight)],
      extrapolate: 'clamp',
    });

    // const headerBackgroundOpacityInterpolate = scrollY.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [1 , 0],
    //   extrapolate: 'clamp',
    // });

    // const headerBackgroundOpacity = {
    //   opacity: headerBackgroundOpacityInterpolate,
    // };

    // const iconBackgroundOpacity = {
    //   opacity: scrollY,
    // };

    const scrollProps = (index) => ({
      contentContainerStyle: {paddingTop: headerExpandedHeight},
      scrollEventThrottle: 16,
      onScroll: Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: this.state.scrollY,
              },
            },
          },
        ],
        {
          useNativeDriver: true,
          listener: ({nativeEvent}) =>
            (this.scrolls[index] = nativeEvent.contentOffset.y),
        },
      ),
    });
    return (
      <>
        <View style={[styles.headerAbsolute]}>
          {this.state.selectedTab === 1 ? (
            <View style={[styles.headerBackground]} />
          ) : (
            false
          )}
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={[styles.headerIcon]}>
              {this.state.selectedTab === 1 ? (
                <View style={[styles.headerIconBackground]} />
              ) : (
                false
              )}
              <IconButton
                icon="search"
                style={[styles.headerIcon]}
                color={Colors.blueGrey900}
                size={20}
                onPress={() =>
                  this.props.navigation.navigate('Detail', {screen: '검색'})
                }
              />
            </View>
            <View style={[styles.headerContent]} />
            <View style={[styles.headerRightContainer]}>
              <View style={[styles.headerIcon]}>
                {this.state.selectedTab === 1 ? (
                  <View style={[styles.headerIconBackground]} />
                ) : (
                  false
                )}
                <IconButton
                  icon="bell"
                  style={[styles.headerIcon]}
                  color={Colors.blueGrey900}
                  size={20}
                  onPress={() =>
                    this.props.navigation.navigate('Detail', {screen: '검색'})
                  }
                />
              </View>
              <View style={[styles.headerIcon]}>
                {this.state.selectedTab === 1 ? (
                  <View style={[styles.headerIconBackground]} />
                ) : (
                  false
                )}

                <IconButton
                  icon="sliders-h"
                  style={[styles.headerIcon]}
                  color={Colors.blueGrey900}
                  size={20}
                  onPress={() => {
                    this.props.openModal();
                  }}
                />
              </View>
            </View>
            <View style={styles.tabsContainer}>
              {/* {this.state.selectedTab === 1 ? (
                <View style={[styles.tabsWrapperBackground]} />
              ) : (
                false
              )} */}
              <View style={styles.tabsWrapper}>
                <MaterialTabs
                  {...this.props}
                  barColor="transparent"
                  activeTextColor={Colors.blueGrey900}
                  inactiveTextColor={Colors.blueGrey200}
                  textStyle={{
                    paddingTop: 8,
                    fontSize: 16,
                    fontWeight: 'bold',
                    letterSpacing: -0.4,
                  }}
                  indicatorColor={Colors.blueGrey900}
                  items={map(tabs, ({label}) => label)}
                  selectedIndex={selectedTab}
                  onChange={(index) => this.onChangePage(index)}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Carousel
            scrollEnabled={false}
            ref={(ref) => (this.carousel = ref)}
            onSnapToItem={(index) => this.onChangePage(index)}
            style={{flex: 1}}
            data={tabs}
            itemWidth={screenWidth}
            sliderWidth={screenWidth}
            inactiveSlideScale={1}
            renderItem={({item: {component, isFlatList}, index}) =>
              isFlatList ? (
                React.cloneElement(component, scrollProps(index))
              ) : (
                //<ScrollView {...scrollProps(index)}>{component}</ScrollView>
                <View>{component}</View>
              )
            }
          />
        </View>
      </>
    );
  }
}

CollapsibleTabs.defaultProps = {
  collapsibleContent: <DefaultHeader />,
};

CollapsibleTabs.propTypes = {
  collapsibleContent: PropTypes.element,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      component: PropTypes.element,
      isFlatList: PropTypes.bool,
    }),
  ).isRequired,
  ...MaterialTabs.propTypes,
  items: PropTypes.any,
  onChange: PropTypes.any,
};

export default CollapsibleTabs;

const styles = {
  // 헤더
  header: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    paddingTop: statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60 + statusBarHeight,
  },
  headerAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    paddingTop: statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60 + statusBarHeight,
    zIndex: 99,
  },

  headerBackground: {
    position: 'absolute',
    top: statusBarHeight + 10,
    left: 10,
    right: 10,
    bottom: 11,
    borderRadius: 40,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    sahdowRadius: 8,
    elevation: 12,
  },

  headerIconBackground: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 38,
    height: 38,
    borderRadius: 22,
    backgroundColor: Colors.white,
    opacity: 0.8,
  },

  headerIcon: {
    flex: 0,
  },

  headerContent: {
    flex: 1,
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  // 탭
  tabsContainer: {
    height: 44,
    position: 'absolute',
    top: 0,
    left: 100,
    right: 100,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabsWrapperBackground: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: '100%',
    height: '100%',
    borderRadius: 22,
    backgroundColor: Colors.white,
    opacity: 0.8,
  },
};
