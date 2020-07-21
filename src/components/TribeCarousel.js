import React, {Component} from 'react';
import {
  Platform,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';

const ENTRIES1 = [
  {
    title: '다이어터',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe01.jpg'),
  },
  {
    title: '유지어터',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe02.jpg'),
  },
  {
    title: '간헐적 다이어터',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe03.jpg'),
  },
  {
    title: '비건',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe04.jpg'),
  },
  {
    title: '클린푸드 매니아',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe05.jpg'),
  },
  {
    title: '보디빌더',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe06.jpg'),
  },
  {
    title: '파워리프터',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe01.jpg'),
  },
  {
    title: '러너',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe01.jpg'),
  },
  {
    title: '요가/필라테스족',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe01.jpg'),
  },
  {
    title: 'MMA/격투가',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe01.jpg'),
  },
  {
    title: '종합레저인',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe01.jpg'),
  },
  {
    title: 'MTB/싸이클러',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe01.jpg'),
  },
  {
    title: '클라이머',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe01.jpg'),
  },
  {
    title: '재활/교정인',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe01.jpg'),
  },
  {
    title: '기타',
    subtitle: '이곳은 간단한 종족에 대한 설명이 들어갈 예정입니다',
    source: require('../assets/tribe01.jpg'),
  },
];

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

const SLIDER_1_FIRST_ITEM = 0;

class SliderEntry extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      data: {title, subtitle, source},
      parallax,
      parallaxProps,
      navigation,
      activeIndex,
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          // console.log(parallaxProps.carouselRef._getItem());
          //alert(`You've clicked '${title}'`);
          //navigation.navigate('추가정보입력두번째');
        }}>
        <View style={[styles.imageContainer]}>
          <ParallaxImage
            source={source}
            containerStyle={[styles.imageContainer]}
            style={styles.image}
            parallaxFactor={0.35}
            showSpinner={true}
            spinnerColor={'rgba(0, 0, 0, 0.25)'}
            {...parallaxProps}
          />
          <View style={[styles.radiusMask]} />
        </View>
        <View style={[styles.textContainer]}>
          <Text style={[styles.title]} numberOfLines={2}>
            {title}
          </Text>
          <Text style={[styles.subtitle]} numberOfLines={2}>
            {subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class TribeCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      navigation: this.props.navigation,
      getIndex: this.props.getIndex,
    };
    this.props.getIndex(ENTRIES1[SLIDER_1_FIRST_ITEM].title);
  }
  _renderItemWithParallax = ({item}, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        parallax={true}
        parallaxProps={parallaxProps}
        navigation={this.props.navigation}
        activeIndex={this.state.slider1ActiveSlide}
      />
    );
  };

  mainExample(number, title) {
    const {slider1ActiveSlide, navigation, getIndex} = this.state;
    return (
      <View style={styles.exampleContainer}>
        <Carousel
          ref={(c) => (this._slider1Ref = c)}
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={false}
          loopClonesPerSide={2}
          autoplay={false}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => {
            this.setState({slider1ActiveSlide: index});
            this.props.getIndex(ENTRIES1[index].title);
          }}
          navigation={this.props.navigation}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'#262828'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={'#262828'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.8}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }
  render() {
    const example1 = this.mainExample(
      1,
      'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots',
    );
    return (
      <View style={styles.container}>
        <View
          style={styles.scrollview}
          scrollEventThrottle={200}
          directionalLockEnabled={true}>
          {example1}
        </View>
      </View>
    );
  }
}

export default TribeCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: -24,
  },
  scrollview: {
    flex: 1,
  },
  exampleContainer: {
    paddingVertical: 0,
  },
  slider: {
    marginTop: 16,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingHorizontal: 48,
    flexWrap: 'wrap',
    paddingVertical: 8,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 20, // needed for shadow
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 0, //카드모양일때는 entryBorderRadius만큼 주면 됨
    backgroundColor: 'white',
  },
  textContainer: {
    justifyContent: 'center',
    //paddingTop: 20 - entryBorderRadius,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    color: '#262828',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    color: '#262828',
    fontSize: 14,
    textAlign: 'center',
  },
});
