import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from 'react-native';
import {AsyncStorage} from '@react-native-community/async-storage';
import {IconButton, Chip, Colors} from 'react-native-paper';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import Modal from 'react-native-modal';

// 디바이스 여백정보
import {getInset} from 'react-native-safe-area-view';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {getDataObject, getData, modifyData} from '../../common/index';
import {bottomPadding} from '../../../utils';
import {trimText} from '../../../utils';

// 직접 제작한 컴포넌트들
import {CircleIndicator} from '../../components/indicator/CircleIndicator';
import {FeedFilter} from '../../components/filter/FeedFilter';
import {CollapsibleTabs} from '../../components/tab/feedTab';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//GPS 위치권한 및 맵관련
import Geolocation from 'react-native-geolocation-service';

import {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  CalloutSubview,
} from 'react-native-maps';
import CustomCallout from '../../components/map/CustomCallout';
import MapView from 'react-native-map-clustering';
// 플랫리스트 위한 칼럼 숫자
const numColumns = 2;

// 화면 디자인 정보 (나중에 유틸이나 스타일로 옮기는게 좋을듯)
const statusBarHeight = getStatusBarHeight();
const screenWidth = Dimensions.get('screen').width;
const windowWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const LATITUDE_DELTA = 0.06;
const ASPECT_RATIO = windowWidth / windowHeight;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_REGION = {
  latitude: 37.715133,
  longitude: 126.734086,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    uid: '',
    play: false,
    dataSource: {},
    data: [],
    page: 20,
    animate: true,
    flatlistReady: true,
    // S : 모달
    modalFilterVisible: false,
    // E : 모달
    filter: {
      workOutCheckYn: true,
      foodCheckYn: true,
      itemCheckYn: true,
      etcCheckYn: true,
      manCheckYn: true,
      womanCheckYn: true,
      locationCheckYn: true,
      tribe1CheckYn: true,
      tribe2CheckYn: true,
      tribe3CheckYn: true,
      tribe4CheckYn: true,
      tribe5CheckYn: true,
      tribe6CheckYn: true,
      tribe7CheckYn: true,
      tribe8CheckYn: true,
      tribe9CheckYn: true,
      tribe10CheckYn: true,
      tribe11CheckYn: true,
      tribe12CheckYn: true,
      tribe13CheckYn: true,
      tribe14CheckYn: true,
      tribe15CheckYn: true,
    },
    modalYn: false,
    followYn: false,
    myLocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    flag: true,
    userData: [],
    refreshing: false,
    tabIndex: 0,
    mateFeedCheckYn: false,
    markers: [],
    positionOk: false,
  };

  handleIndexChange = (index) => {
    this.setState({
      tabIndex: index,
    });
  };

  async componentDidMount() {
    console.log(MapView);
    this.setState({
      uid: await getData('uid'),
    });
    let tmp = await getDataObject('filter');
    if (tmp) {
      this.setState({
        filter: tmp,
      });
    } else {
      this.setState({
        filter: {
          workOutCheckYn: true,
          foodCheckYn: true,
          itemCheckYn: true,
          etcCheckYn: true,
          manCheckYn: true,
          womanCheckYn: true,
          locationCheckYn: true,
          tribe1CheckYn: true,
          tribe2CheckYn: true,
          tribe3CheckYn: true,
          tribe4CheckYn: true,
          tribe5CheckYn: true,
          tribe6CheckYn: true,
          tribe7CheckYn: true,
          tribe8CheckYn: true,
          tribe9CheckYn: true,
          tribe10CheckYn: true,
          tribe11CheckYn: true,
          tribe12CheckYn: true,
          tribe13CheckYn: true,
          tribe14CheckYn: true,
          tribe15CheckYn: true,
        },
      });
    }
    if (Platform.OS === 'ios') {
      let locationPermission = await Geolocation.requestAuthorization('always');
      if (locationPermission === 'granted') {
        this._getGeolocation();
      }
      if (locationPermission === 'denied') {
        this.setState({
          myLocation: {
            latitude: 37.715133,
            longitude: 126.734086,
            latitudeDelta: 0,
            longitudeDelta: 0,
          },
        });
      }
    }

    await this._getUserDefaultData();
    this._getHomeData();
  }
  _getGeolocation = async () => {
    await Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          myLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          positionOk: true,
        });

        this._getMapData(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  _getMapData = async (lat, lng) => {
    const url = 'https://www.circlin.co.kr/circlinApi/v3/mateMap';
    this.setState({animate: true});
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: this.state.uid,
        lat: lat,
        lng: lng,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.resPonseCode == 200) {
          this.setState({
            markers: responseJson.data,
            animate: false,
          });

          //  this.fitAllMarkers();
        }
      });
  };

  _getUserDefaultData = () => {
    const url = 'https://www.circlin.co.kr/circlinApi/v3/user/userDefaultData';
    this.setState({animate: true});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: this.state.uid,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resPonseCode == 200) {
          this.setState({
            userData: responseJson.data,
          });
        }
      });
  };

  _getHomeData = async () => {
    const {uid, filter, page, userData, mateFeedCheckYn} = this.state;
    let filterData = {
      workOutValue: filter.workOutCheckYn ? 'W' : '',
      foodValue: filter.foodCheckYn ? 'F' : '',
      itemValue: filter.itemCheckYn ? 'I' : '',
      etcValue: filter.etcCheckYn ? 'E' : '',
      manValue: filter.manCheckYn ? 'M' : '',
      womanValue: filter.womanCheckYn ? 'W' : '',
      cityValue: filter.locationCheckYn ? '' : userData.CITY,
      countyValue: filter.locationCheckYn ? '' : userData.COUNTY,
      tribe1Value: filter.tribe1CheckYn ? '1' : '',
      tribe2Value: filter.tribe2CheckYn ? '2' : '',
      tribe3Value: filter.tribe3CheckYn ? '3' : '',
      tribe4Value: filter.tribe4CheckYn ? '4' : '',
      tribe5Value: filter.tribe5CheckYn ? '5' : '',
      tribe6Value: filter.tribe6CheckYn ? '6' : '',
      tribe7Value: filter.tribe7CheckYn ? '7' : '',
      tribe8Value: filter.tribe8CheckYn ? '8' : '',
      tribe9Value: filter.tribe9CheckYn ? '9' : '',
      tribe10Value: filter.tribe10CheckYn ? '10' : '',
      tribe11Value: filter.tribe11CheckYn ? '11' : '',
      tribe12Value: filter.tribe12CheckYn ? '12' : '',
      tribe13Value: filter.tribe13CheckYn ? '13' : '',
      tribe14Value: filter.tribe14CheckYn ? '14' : '',
      tribe15Value: filter.tribe15CheckYn ? '15' : '',
      mateCheckYn: mateFeedCheckYn ? 'mate' : '',
    };
    const url = 'https://www.circlin.co.kr/circlinApi/v3/feed';
    this.setState({animate: true});
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page: page,
        uid: uid,
        filter: filterData,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resPonseCode == 200) {
          if (this.state.flag) {
            this.setState({
              animate: false,
              data: modifyData(responseJson.data),
              flatlistReady: true,
              page: this.state.page + 20,
              flag: false,
            });
          } else {
            this.setState({
              animate: false,
              data: this.state.refreshing
                ? modifyData(responseJson.data)
                : this.state.data.concat(modifyData(responseJson.data)),
              flatlistReady: true,
              page: this.state.page + 20,
              refreshing: false,
            });
          }
        }
      });
  };

  _onRefresh = () => {
    this.setState(
      {
        refreshing: true,
        page: 20,
        flag: true,
      },
      () => this._getHomeData(),
    );
  };

  _handleLoadMore = () => {
    if (this.state.flatlistReady) {
      this._getHomeData();
    }
  };

  // S : 필터
  setModalFilterVisible = (visible) => {
    this.setState({modalFilterVisible: visible});
  };

  _moveUserInfo = (seq, userPk, index) => {
    this.props.navigation.navigate('Detail', {
      screen: '유저상세',
      uid: this.state.uid,
      userPk: userPk,
    });
  };

  _moveFeedDet = (item, index) => {
    this.props.navigation.navigate('Detail', {
      screen: '피드상세',
      uid: this.state.uid,
      feed: item,
    });
  };

  _inlikeFeed = (seq, userPk, index, type) => {
    let arr = new Array();

    arr = this.state.data;

    if (type == 2) {
      arr[index].LIKEYN = 'Y';
      arr[index].LIKE_COUNT = Number(this.state.data[index].LIKE_COUNT) + 1;
    } else {
      arr[index][type].LIKEYN = 'Y';
      arr[index][type].LIKE_COUNT =
        Number(this.state.data[index][type].LIKE_COUNT) + 1;
    }

    this.setState({
      data: arr,
    });
    const url = 'https://www.circlin.co.kr/circlinApi/v3/like';
    this.setState({animate: true});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feedPk: seq,
        uid: this.state.uid,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resPonseCode == 200) {
          this.setState({
            animate: false,
          });
        }
      });
  };

  _delikeFeed = (seq, userPk, index, type) => {
    let arr = new Array();
    arr = this.state.data;
    if (type == 2) {
      arr[index].LIKEYN = null;
      arr[index].LIKE_COUNT = Number(this.state.data[index].LIKE_COUNT) - 1;
    } else {
      arr[index][type].LIKEYN = null;
      arr[index][type].LIKE_COUNT =
        Number(this.state.data[index][type].LIKE_COUNT) - 1;
    }

    this.setState({
      data: arr,
    });
    const url = 'https://www.circlin.co.kr/circlinApi/v3/delete/like';
    this.setState({animate: true});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feedPk: seq,
        uid: this.state.uid,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resPonseCode == 200) {
          this.setState({
            animate: false,
          });
        }
      });
  };

  _renderHeader = () => {
    return (
      <View style={{marginTop: 16, marginBottom: 8, alignItems: 'flex-end'}}>
        <Chip
          mode="outlined"
          icon={() => (
            <FontAwesome5Pro
              name={
                this.state.mateFeedCheckYn === true ? 'check-circle' : 'circle'
              }
              size={16}
              color={
                this.state.mateFeedCheckYn === true
                  ? Colors.blueGrey900
                  : Colors.blueGrey200
              }
            />
          )}
          style={{
            margin: 4,
            backgroundColor:
              this.state.mateFeedCheckYn === true
                ? Colors.white
                : Colors.blueGrey50,
            borderWidth: 1,
            borderColor:
              this.state.mateFeedCheckYn === true
                ? Colors.blueGrey900
                : Colors.blueGrey200,
          }}
          textStyle={{
            fontWeight: 'bold',
            color:
              this.state.mateFeedCheckYn === true
                ? Colors.blueGrey900
                : Colors.blueGrey200,
          }}
          onPress={() =>
            this.setState({
              mateFeedCheckYn: !this.state.mateFeedCheckYn,
            })
          }
          selected={this.state.mateFeedCheckYn}>
          내 메이트만 보기
        </Chip>
      </View>
    );
  };

  _renderItem = ({item, index}) => {
    if (item.length == 2) {
      return (
        <View style={(styles.itemVideoContainer, {flexDirection: 'row'})}>
          <View style={styles.itemImageContainer}>
            <FastImage
              source={{
                uri: item[0].IMG1 ? item[0].IMG1 : '',
                priority: FastImage.priority.normal,
              }}
              style={styles.itemImage}
            />
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.8)',
                'rgba(0,0,0,0.2)',
                'rgba(0,0,0,0)',
                'rgba(0,0,0,0.2)',
                'rgba(0,0,0,0.8)',
              ]}
              style={styles.itemCard}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this._moveUserInfo(item[0].SEQ, item[0].USER_PK, index)
                }>
                <View style={styles.itemHeader}>
                  <View style={[styles.itemUserVisual]}>
                    {item[0].PROFILE_IMG ? (
                      <FastImage
                        source={{
                          uri: item[0].PROFILE_IMG,
                          priority: FastImage.priority.normal,
                        }}
                        style={[styles.itemUserImage]}
                      />
                    ) : (
                      <View style={[styles.itemUserEmptyImage]}></View>
                    )}
                  </View>
                  <View style={styles.itemUserInfo}>
                    <Text style={styles.itemUserName}>
                      {trimText(item[0].NICKNAME, 10)}
                    </Text>
                    <Text style={styles.itemUserDescription}>
                      {trimText(item[0].MY_FACIL, 6)} · 종족
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.itemContent}>
                <TouchableWithoutFeedback
                  onPress={() => this._moveFeedDet(item[0], index)}>
                  <View style={styles.itemTextArea}>
                    <Text style={styles.itemText}>
                      {trimText(item[1].TEXTDATA, 50)}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.itemActions}>
                <View style={styles.itemButton}>
                  {item[0].LIKEYN == 'Y' ? (
                    <IconButton
                      icon="heart"
                      solid={true}
                      style={styles.itemButtonIcon}
                      color={Colors.pinkA400}
                      size={20}
                      onPress={() =>
                        this._delikeFeed(item[0].SEQ, item[0].USER_PK, index, 0)
                      }
                    />
                  ) : (
                    <IconButton
                      icon="heart"
                      style={styles.itemButtonIcon}
                      color={Colors.white}
                      size={20}
                      onPress={() =>
                        this._inlikeFeed(item[0].SEQ, item[0].USER_PK, index, 0)
                      }
                    />
                  )}
                  <Text style={styles.itemButtonText}>
                    {item[0].LIKE_COUNT}
                  </Text>
                </View>
                <View style={styles.itemButton}>
                  <IconButton
                    icon="comment"
                    style={styles.itemButtonIcon}
                    color={Colors.white}
                    size={20}
                    onPress={() => console.log('Pressed')}
                  />
                  <Text style={styles.itemButtonText}>{item[0].COMMENT}</Text>
                </View>
              </View>
            </LinearGradient>
            <View style={[styles.itemFAB]} onPress={() => {}}>
              <FontAwesome5Pro
                name="shopping-cart"
                size={20}
                color={Colors.blueGrey900}
              />
            </View>
          </View>
          <View style={styles.itemImageContainer}>
            <FastImage
              source={{
                uri: item[1].IMG1 ? item[1].IMG1 : '',
                priority: FastImage.priority.normal,
              }}
              style={styles.itemImage}
            />
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.8)',
                'rgba(0,0,0,0.2)',
                'rgba(0,0,0,0)',
                'rgba(0,0,0,0.2)',
                'rgba(0,0,0,0.8)',
              ]}
              style={styles.itemCard}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this._moveUserInfo(item[1].SEQ, item[1].USER_PK, index)
                }>
                <View style={styles.itemHeader}>
                  <View style={[styles.itemUserVisual]}>
                    {item[1].PROFILE_IMG ? (
                      <FastImage
                        source={{
                          uri: item[1].PROFILE_IMG,
                          priority: FastImage.priority.normal,
                        }}
                        style={[styles.itemUserImage]}
                      />
                    ) : (
                      <View style={[styles.itemUserEmptyImage]}></View>
                    )}
                  </View>
                  <View style={styles.itemUserInfo}>
                    <Text style={styles.itemUserName}>
                      {trimText(item[1].NICKNAME, 10)}
                    </Text>
                    <Text style={styles.itemUserDescription}>
                      {trimText(item[1].MY_FACIL, 6)} · 종족
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.itemContent}>
                <TouchableWithoutFeedback
                  onPress={() => this._moveFeedDet(item[1], index)}>
                  <View style={styles.itemTextArea}>
                    <Text style={styles.itemText}>
                      {trimText(item[1].TEXTDATA, 50)}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.itemActions}>
                <View style={styles.itemButton}>
                  {item[1].LIKEYN == 'Y' ? (
                    <IconButton
                      icon="heart"
                      solid={true}
                      style={styles.itemButtonIcon}
                      color={Colors.pinkA400}
                      size={20}
                      onPress={() =>
                        this._delikeFeed(item[1].SEQ, item[1].USER_PK, index, 1)
                      }
                    />
                  ) : (
                    <IconButton
                      icon="heart"
                      style={styles.itemButtonIcon}
                      color={Colors.white}
                      size={20}
                      onPress={() =>
                        this._inlikeFeed(item[1].SEQ, item[1].USER_PK, index, 1)
                      }
                    />
                  )}
                  <Text style={styles.itemButtonText}>
                    {item[1].LIKE_COUNT}
                  </Text>
                </View>
                <View style={styles.itemButton}>
                  <IconButton
                    icon="comment"
                    style={styles.itemButtonIcon}
                    color={Colors.white}
                    size={20}
                    onPress={() => console.log('Pressed')}
                  />
                  <Text style={styles.itemButtonText}>{item[1].COMMENT}</Text>
                </View>
              </View>
            </LinearGradient>
            <View style={[styles.itemFAB]} onPress={() => {}}>
              <FontAwesome5Pro
                name="shopping-cart"
                size={20}
                color={Colors.blueGrey900}
              />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.itemVideoContainer}>
          <Video
            source={{
              uri: item.IMG1,
              seq: item.SEQ,
            }}
            style={styles.itemVideo}
            resizeMode="cover"
            ref={(ref) => {
              this.player = ref;
            }} // Store reference
            onBuffer={this.onBuffer} // Callback when remote video is buffering
            onError={this.videoError}
            repeat={true}
            muted={true}
            paused={this.state.paused == item.SEQ ? false : true}
          />
          <LinearGradient
            colors={[
              'rgba(0,0,0,0.8)',
              'rgba(0,0,0,0.2)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0.2)',
              'rgba(0,0,0,0.8)',
            ]}
            style={styles.itemCard}>
            <TouchableWithoutFeedback
              onPress={() => this._moveUserInfo(item.SEQ, item.USER_PK, index)}>
              <View style={styles.itemHeader}>
                <View style={[styles.itemUserVisual]}>
                  {item.PROFILE_IMG ? (
                    <FastImage
                      source={{
                        uri: item.PROFILE_IMG,
                        priority: FastImage.priority.normal,
                      }}
                      style={[styles.itemUserImage]}
                    />
                  ) : (
                    <View style={[styles.itemUserEmptyImage]}></View>
                  )}
                </View>
                <View style={styles.itemUserInfo}>
                  <Text style={styles.itemUserName}>
                    {trimText(item.NICKNAME, 10)}
                  </Text>
                  <Text style={styles.itemUserDescription}>
                    {trimText(item.MY_FACIL, 6)} · 종족
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.itemContent}>
              <TouchableWithoutFeedback
                onPress={() => this._moveFeedDet(item, index)}>
                <View style={styles.itemTextArea}>
                  <Text style={styles.itemText}>
                    {trimText(item.TEXTDATA, 50)}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.itemActions}>
              <View style={styles.itemButton}>
                {item.LIKEYN == 'Y' ? (
                  <IconButton
                    icon="heart"
                    solid={true}
                    style={styles.itemButtonIcon}
                    color={Colors.pinkA400}
                    size={20}
                    onPress={() =>
                      this._delikeFeed(item.SEQ, item.USER_PK, index, 2)
                    }
                  />
                ) : (
                  <IconButton
                    icon="heart"
                    style={styles.itemButtonIcon}
                    color={Colors.white}
                    size={20}
                    onPress={() =>
                      this._inlikeFeed(item.SEQ, item.USER_PK, index, 2)
                    }
                  />
                )}
                <Text style={styles.itemButtonText}>{item.LIKE_COUNT}</Text>
              </View>
              <View style={styles.itemButton}>
                <IconButton
                  icon="comment"
                  style={styles.itemButtonIcon}
                  color={Colors.white}
                  size={20}
                  onPress={() => console.log('Pressed')}
                />
                <Text style={styles.itemButtonText}>{item.COMMENT}</Text>
              </View>
            </View>
          </LinearGradient>
          <View style={[styles.itemFAB]} onPress={() => {}}>
            <FontAwesome5Pro
              name="shopping-cart"
              size={20}
              color={Colors.blueGrey900}
            />
          </View>
        </View>
      );
    }
  };

  onChange = (props) => {
    const changed = props.changed;
    const viewableItems = props.viewableItems;
    changed.forEach((item) => {
      if (!item.isViewable && item.item.IMG1TYPE == 'video') {
        this.setState({
          paused: null,
        });
      }
      viewableItems.forEach((item) => {
        if (item.isViewable && item.item.IMG1TYPE == 'video') {
          this.setState({
            paused: item.item.SEQ,
          });
        }
      });
    });
  };
  _openModal = () => {
    this.setState({
      modalYn: true,
    });
  };
  _closeModal = () => {
    this.setState({
      modalYn: false,
    });
  };
  _setFilter = (filter) => {
    this.setState({
      filter: filter,
    });
  };
  _markerClick = (marker) => {
    console.log(marker);
  };
  render() {
    const newData = this.state.data;
    console.log(this.state.myLocation);
    return (
      <>
        {this.state.animate ? (
          <CircleIndicator animate={this.state.animate} />
        ) : null}
        <Modal
          isVisible={this.state.modalYn}
          animationIn={'slideInRight'}
          animationOut={'slideOutRight'}
          onBackdropPress={() => this.setState({modalYn: false})}
          style={{margin: 0, alignItems: 'flex-end'}}>
          <FeedFilter
            navigation={this.props.navigation}
            filter={this.state.filter}
            closeModal={this._closeModal.bind(this)}
            setFilter={this._setFilter.bind(this)}
          />
        </Modal>
        <CollapsibleTabs
          openModal={this._openModal.bind(this)}
          navigation={this.props.navigation}
          collapsibleContent={<View></View>}
          tabs={[
            {
              label: '피드',
              isFlatList: true, // this is important
              component: (
                <View style={styles.container}>
                  <View style={styles.headerAbsoluteMargin} />
                  <FlatList
                    data={newData}
                    renderItem={this._renderItem}
                    renderHeader={this._renderHeader}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this._handleLoadMore}
                    ListHeaderComponent={this._renderHeader}
                    onViewableItemsChanged={this.onChange}
                    scrollEventThrottle={16}
                    viewabilityConfig={{
                      viewAreaCoveragePercentThreshold: 50,
                    }}
                    refreshing={this.state.refreshing}
                  />
                </View>
              ),
            },
            {
              label: '지도',
              component: (
                <>
                  <StatusBar
                    barStyle="default"
                    backgroundColor="transparent"
                    translucent={true}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      flex: 1,
                      backgroundColor: 'red',
                    }}>
                    {this.state.positionOk ? (
                      <MapView
                        provider={PROVIDER_GOOGLE}
                        clusterColor={Colors.deepOrange600}
                        style={{width: windowWidth, height: windowHeight}}
                        onClusterPress={(coordinate, markers) => {
                          markers.map((item, index) => {
                            console.log(
                              this.state.markers[item.properties.index],
                            ); //여기로그에 나오는데이터 활용 클러스터 클릭은 정중앙에 말풍선따로그려줘 안되네
                            return (
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: 200,
                                  height: 200,
                                  backgroundColor: 'red',
                                  position: 'absolute',
                                }}>
                                <Text>
                                  {
                                    this.state.markers[item.properties.index]
                                      .NICKNAME
                                  }
                                </Text>
                              </View>
                            );
                          });
                        }}
                        maxZoomLevel={17}
                        zoomEnabled={false}
                        initialRegion={this.state.myLocation}>
                        {this.state.markers.map((marker, index) => {
                          return (
                            <Marker
                              key={index}
                              coordinate={{
                                latitude: parseFloat(marker.LAT),
                                longitude: parseFloat(marker.LNG),
                              }}
                              onPress={() => this._markerClick(marker)}
                              style={{width: 30, height: 30}}>
                              <Callout
                                alphaHitTest
                                tooltip
                                onPress={(e) => {
                                  if (
                                    e.nativeEvent.action ===
                                      'marker-inside-overlay-press' ||
                                    e.nativeEvent.action ===
                                      'callout-inside-press'
                                  ) {
                                    return;
                                  }

                                  //click 시 다른 팝업 띄울수 있음 말풍선이벤트 콜아웃서브뷰 클릭은 아래 이벤트가 각각 따로임 필요없음 빼도됨
                                }}
                                style={styles.customView}>
                                <CustomCallout>
                                  <Text>{`This is a custom callout bubble view `}</Text>
                                  <CalloutSubview
                                    onPress={() => {
                                      console.log(12313132131);
                                    }}
                                    style={[styles.calloutButton]}>
                                    <Text>서브뷰</Text>
                                  </CalloutSubview>
                                </CustomCallout>
                              </Callout>
                              <View
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 15,
                                  backgroundColor: 'red',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <FastImage
                                  source={{
                                    uri: marker.PROFILE_IMG
                                      ? marker.PROFILE_IMG
                                      : null,
                                    priority: FastImage.priority.normal,
                                  }}
                                  style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 12.5,
                                  }}
                                />
                              </View>
                            </Marker>
                          );
                        })}
                      </MapView>
                    ) : null}
                  </View>
                </>
              ),
            },
          ]}
        />
      </>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  // 헤더
  header: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    paddingTop: statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60 + statusBarHeight,
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
  headerAbsoluteMargin: {
    height: 60 + statusBarHeight,
  },
  // 컨테이너
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  // 피드 아이템
  itemVideoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1 / 2,
    margin: 4,
    height: (screenWidth / numColumns) * 1.12,
  },
  itemImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1 / 2,
    margin: 4,
    height: (screenWidth / numColumns) * 1.4,
  },
  itemVideo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  itemCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
  },
  itemHeader: {
    padding: 12,
    flexDirection: 'row',
  },
  itemUserVisual: {
    marginRight: 8,
  },
  itemUserImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: 'cover',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  itemUserEmptyImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemUserInfo: {
    justifyContent: 'center',
  },
  itemUserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 2,
  },
  itemUserDescription: {
    fontSize: 10,
    color: Colors.white,
  },
  itemContent: {
    flex: 1,
  },
  itemTextArea: {
    flex: 1,
    padding: 12,
    justifyContent: 'flex-end',
  },
  itemText: {
    fontSize: 12,
    color: Colors.white,
  },
  itemActions: {
    padding: 4,
    flexDirection: 'row',
  },
  itemButton: {
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemButtonIcon: {
    margin: 0,
  },
  itemButtonText: {
    fontSize: 16,
    color: Colors.white,
  },
  itemFAB: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
