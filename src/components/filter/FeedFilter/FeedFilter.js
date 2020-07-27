import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {IconButton, Button, Colors, Chip} from 'react-native-paper';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Header} from 'react-native-elements';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import {SafeAreaView} from 'react-native-safe-area-context';
import {storeDataObject} from '../../../common/index';
import {bottomPadding, topPadding} from '../../../../utils';

const statusBarHeight = getStatusBarHeight();
const screenWidth = Dimensions.get('screen').width;
const windowWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;

class FeedFilter extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      workOutCheckYn: this.props.filter.workOutCheckYn,
      foodCheckYn: this.props.filter.foodCheckYn,
      itemCheckYn: this.props.filter.itemCheckYn,
      etcCheckYn: this.props.filter.etcCheckYn,
      manCheckYn: this.props.filter.manCheckYn,
      womanCheckYn: this.props.filter.womanCheckYn,
      locationCheckYn: this.props.filter.locationCheckYn,
      tribe1CheckYn: this.props.filter.tribe1CheckYn,
      tribe2CheckYn: this.props.filter.tribe2CheckYn,
      tribe3CheckYn: this.props.filter.tribe3CheckYn,
      tribe4CheckYn: this.props.filter.tribe4CheckYn,
      tribe5CheckYn: this.props.filter.tribe5CheckYn,
      tribe6CheckYn: this.props.filter.tribe6CheckYn,
      tribe7CheckYn: this.props.filter.tribe7CheckYn,
      tribe8CheckYn: this.props.filter.tribe8CheckYn,
      tribe9CheckYn: this.props.filter.tribe9CheckYn,
      tribe10CheckYn: this.props.filter.tribe10CheckYn,
      tribe11CheckYn: this.props.filter.tribe11CheckYn,
      tribe12CheckYn: this.props.filter.tribe12CheckYn,
      tribe13CheckYn: this.props.filter.tribe13CheckYn,
      tribe14CheckYn: this.props.filter.tribe14CheckYn,
      tribe15CheckYn: this.props.filter.tribe15CheckYn,
    };
  }
  setLocalFilterData = async () => {
    let obj = new Object();
    obj.workOutCheckYn = this.state.workOutCheckYn;
    obj.foodCheckYn = this.state.foodCheckYn;
    obj.itemCheckYn = this.state.itemCheckYn;
    obj.etcCheckYn = this.state.etcCheckYn;
    obj.manCheckYn = this.state.manCheckYn;
    obj.womanCheckYn = this.state.womanCheckYn;
    obj.locationCheckYn = this.state.locationCheckYn;
    obj.tribe1CheckYn = this.state.tribe1CheckYn;
    obj.tribe2CheckYn = this.state.tribe2CheckYn;
    obj.tribe3CheckYn = this.state.tribe3CheckYn;
    obj.tribe4CheckYn = this.state.tribe4CheckYn;
    obj.tribe5CheckYn = this.state.tribe5CheckYn;
    obj.tribe6CheckYn = this.state.tribe6CheckYn;
    obj.tribe7CheckYn = this.state.tribe7CheckYn;
    obj.tribe8CheckYn = this.state.tribe8CheckYn;
    obj.tribe9CheckYn = this.state.tribe9CheckYn;
    obj.tribe10CheckYn = this.state.tribe10CheckYn;
    obj.tribe11CheckYn = this.state.tribe11CheckYn;
    obj.tribe12CheckYn = this.state.tribe12CheckYn;
    obj.tribe13CheckYn = this.state.tribe13CheckYn;
    obj.tribe14CheckYn = this.state.tribe14CheckYn;
    obj.tribe15CheckYn = this.state.tribe15CheckYn;
    await storeDataObject('filter', obj);
    this.props.setFilter(obj);
    this.props.closeModal();
  };
  closeModal = () => {
    this.props.closeModal();
  };
  render() {
    const {
      workOutCheckYn,
      foodCheckYn,
      itemCheckYn,
      etcCheckYn,
      manCheckYn,
      womanCheckYn,
      locationCheckYn,
      tribe1CheckYn,
      tribe2CheckYn,
      tribe3CheckYn,
      tribe4CheckYn,
      tribe5CheckYn,
      tribe6CheckYn,
      tribe7CheckYn,
      tribe8CheckYn,
      tribe9CheckYn,
      tribe10CheckYn,
      tribe11CheckYn,
      tribe12CheckYn,
      tribe13CheckYn,
      tribe14CheckYn,
      tribe15CheckYn,
    } = this.state;

    console.log(locationCheckYn);

    return (
      <View style={[styles.container]}>
        <View style={[styles.header]}>
          <IconButton
            icon="times"
            style={[styles.headerIcon]}
            color={Colors.blueGrey900}
            size={20}
            onPress={this.closeModal}
          />
        </View>
        <ScrollView style={[styles.content]}>
          <Text style={[styles.chipsTitle]}>피드 종류</Text>
          <View style={[styles.chipsContainer]}>
            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.workOutCheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.workOutCheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.workOutCheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.workOutCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.workOutCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  workOutCheckYn: !workOutCheckYn,
                })
              }
              selected={workOutCheckYn}>
              운동 기록
            </Chip>
            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.foodCheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.foodCheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.foodCheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.foodCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.foodCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  foodCheckYn: !foodCheckYn,
                })
              }
              selected={foodCheckYn}>
              식단 기록
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.itemCheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.itemCheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.itemCheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.itemCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.itemCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  itemCheckYn: !itemCheckYn,
                })
              }
              selected={itemCheckYn}>
              아이템 기록
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.etcCheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.etcCheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.etcCheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.etcCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.etcCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  etcCheckYn: !etcCheckYn,
                })
              }
              selected={etcCheckYn}>
              기타 기록
            </Chip>
          </View>

          <Text style={[styles.chipsTitle]}>성별</Text>
          <View style={[styles.chipsContainer]}>
            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.manCheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.manCheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.manCheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.manCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.manCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() => {
                this.setState({
                  manCheckYn: !manCheckYn,
                });
              }}
              selected={manCheckYn}>
              남성
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.womanCheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.womanCheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.womanCheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.womanCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.womanCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  womanCheckYn: !womanCheckYn,
                })
              }
              selected={womanCheckYn}>
              여성
            </Chip>
          </View>

          <Text style={[styles.chipsTitle]}>지역</Text>
          <View style={[styles.chipsContainer]}>
            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.locationCheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.locationCheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.locationCheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.locationCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.locationCheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  locationCheckYn: true,
                })
              }
              selected={locationCheckYn ? true : false}>
              모든 지역
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.locationCheckYn === false
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.locationCheckYn === false
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.locationCheckYn === false
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.locationCheckYn === false
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.locationCheckYn === false
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  locationCheckYn: false,
                })
              }
              selected={locationCheckYn ? false : true}>
              내지역
            </Chip>
          </View>

          <Text style={[styles.chipsTitle]}>유형</Text>
          <View style={[styles.chipsContainer]}>
            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe1CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe1CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe1CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe1CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe1CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() => {
                this.setState({
                  tribe1CheckYn: !tribe1CheckYn,
                });
              }}
              selected={tribe1CheckYn}>
              다이어터
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe2CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe2CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe2CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe2CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe2CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe2CheckYn: !tribe2CheckYn,
                })
              }
              selected={tribe2CheckYn}>
              유지어터
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe3CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe3CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe3CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe3CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe3CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe3CheckYn: !tribe3CheckYn,
                })
              }
              selected={tribe3CheckYn}>
              간헐적 다이어터
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe4CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe4CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe4CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe4CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe4CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe4CheckYn: !tribe4CheckYn,
                })
              }
              selected={tribe4CheckYn}>
              비건
            </Chip>
            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe5CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe5CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe5CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe5CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe5CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe5CheckYn: !tribe5CheckYn,
                })
              }
              selected={tribe5CheckYn}>
              클린푸드 매니아
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe6CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe6CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe6CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe6CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe6CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe6CheckYn: !tribe6CheckYn,
                })
              }
              selected={tribe6CheckYn}>
              보디빌더
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe7CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe7CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe7CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe7CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe7CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe7CheckYn: !tribe7CheckYn,
                })
              }
              selected={tribe7CheckYn}>
              파워리프터
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe8CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe8CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe8CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe8CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe8CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe8CheckYn: !tribe8CheckYn,
                })
              }
              selected={tribe8CheckYn}>
              러너
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe9CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe9CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe9CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe9CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe9CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe9CheckYn: !tribe9CheckYn,
                })
              }
              selected={tribe9CheckYn}>
              요가/필라테스족
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe10CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe10CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe10CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe10CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe10CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe10CheckYn: !tribe10CheckYn,
                })
              }
              selected={tribe10CheckYn}>
              MMA/격투가
            </Chip>
            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe11CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe11CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe11CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe11CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe11CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe11CheckYn: !tribe11CheckYn,
                })
              }
              selected={tribe11CheckYn}>
              종합레저인
            </Chip>
            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe12CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe12CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe12CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe12CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe12CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe12CheckYn: !tribe12CheckYn,
                })
              }
              selected={tribe12CheckYn}>
              MTB/싸이클러
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe13CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe13CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe13CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe13CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe13CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe13CheckYn: !tribe13CheckYn,
                })
              }
              selected={tribe13CheckYn}>
              클라이머
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe14CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe14CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe14CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe14CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe14CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe14CheckYn: !tribe14CheckYn,
                })
              }
              selected={tribe14CheckYn}>
              재활/교정인
            </Chip>

            <Chip
              mode="outlined"
              icon={() => (
                <FontAwesome5Pro
                  name={
                    this.state.tribe15CheckYn === true
                      ? 'minus-circle'
                      : 'plus-circle'
                  }
                  size={16}
                  color={
                    this.state.tribe15CheckYn === true
                      ? Colors.blueGrey900
                      : Colors.blueGrey200
                  }
                />
              )}
              style={{
                margin: 4,
                backgroundColor:
                  this.state.tribe15CheckYn === true
                    ? Colors.white
                    : Colors.blueGrey50,
                borderWidth: 1,
                borderColor:
                  this.state.tribe15CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              textStyle={{
                fontWeight: 'bold',
                color:
                  this.state.tribe15CheckYn === true
                    ? Colors.blueGrey900
                    : Colors.blueGrey200,
              }}
              onPress={() =>
                this.setState({
                  tribe15CheckYn: !tribe15CheckYn,
                })
              }
              selected={tribe15CheckYn}>
              기타
            </Chip>
          </View>
        </ScrollView>
        <KeyboardAvoidingView
          style={styles.buttonContainer}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <Button
            mode="contained"
            color={Colors.blueGrey900}
            onPress={() => {
              this.setLocalFilterData();
            }}
            style={{
              borderRadius: 0,
              paddingBottom: bottomPadding,
            }}
            contentStyle={{height: 60}}
            labelStyle={{fontSize: 16, fontWeight: 'bold', letterSpacing: 0}}>
            필터 적용
          </Button>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default FeedFilter;

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
  // 공통
  container: {
    flex: 1,
    width: screenWidth * 0.9,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  //칩스
  chipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  chipsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    //borderBottomWidth: 1,
    //borderBottomColor: Colors.blueGrey50,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
