/* eslint-disable react-native/no-inline-styles */
import React, { Component, createRef } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
  StyleProp,
  ViewStyle,
  ViewToken,
  ImageStyle,
} from 'react-native';
import Indicator from './Indicator';
import ChildItem from './ChildItem';

/**
 * SliderProps
 */
export interface SliderProps {
  data: any[];
  local?: boolean;
  width?: number;
  height?: number;
  loop?: boolean;
  imageKey?: string;
  separatorWidth?: number;
  autoScroll?: boolean;
  timer?: number;
  onPress?: (index: number) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  currentIndexCallback?: (index: number) => void;
  indicator?: boolean;
  indicatorStyle?: StyleProp<ViewStyle>;
  indicatorContainerStyle?: StyleProp<ViewStyle>;
  indicatorActiveColor: string;
  indicatorInActiveColor: string;
  indicatorActiveWidth?: number;
  animation?: boolean;
  style?: StyleProp<ViewStyle>;
  imageStyles?: StyleProp<ImageStyle>;
  navigation?: any;
}

/**
 * StateProps
 */
export interface StateProps {
  index: number;
  data: any[];
}
export default class Slider extends Component<SliderProps, StateProps> {
  slider = createRef<FlatList>();

  static defaultProps = {
    data: [],
    local: false,
    width: Math.round(Dimensions.get('window').width),
    height: 230,
    separatorWidth: 0,
    loop: false,
    indicator: true,
    indicatorStyle: {},
    indicatorContainerStyle: {},
    indicatorActiveColor: '#3498db',
    indicatorInActiveColor: '#bdc3c7',
    indicatorActiveWidth: 6,
    animation: true,
    autoScroll: false,
    timer: 3000,
    onPress: {},
    contentContainerStyle: {},
  };
  sliderTimer: any;

  constructor(props: SliderProps | Readonly<SliderProps>) {
    super(props);
    this.state = {
      index: 0,
      data: this.props.data,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    if (this.props.autoScroll) {
      this.props.navigation?.addListener('focus', () => {
        this.startAutoPlay();
      });
      this.props.navigation?.addListener('blur', () => {
        this.stopAutoPlay();
      });
    }
  }

  componentDidUpdate(prevProps: SliderProps) {
    if (prevProps.data !== this.props.data)
      this.setState({ data: this.props.data });
  }

  componentWillUnmount() {
    if (this.props.autoScroll) {
      this.stopAutoPlay();
    }
  }

  render() {
    const itemWidth = this.props.width!;
    const separatorWidth = this.props.separatorWidth!;
    const { imageKey } = this.props;
    const totalItemWidth = itemWidth + separatorWidth;

    return (
      <View
        style={[
          this.props.style,
          { alignSelf: 'stretch', height: this.props.height },
        ]}
      >
        <FlatList
          ref={this.slider}
          horizontal
          pagingEnabled={true}
          snapToInterval={totalItemWidth}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={this.props.contentContainerStyle}
          data={this.state.data}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ChildItem
              {...{ imageKey }}
              style={[{ width: this.props.width }, this.props.imageStyles]}
              {...{ item }}
              onPress={this.props.onPress}
              index={this.state.index % this.props.data.length}
              local={this.props.local!}
              height={this.props.height!}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ width: this.props.separatorWidth }} />
          )}
          keyExtractor={(item, index) => item.toString() + index}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          getItemLayout={(_, index) => ({
            length: totalItemWidth,
            offset: totalItemWidth * index,
            index,
          })}
          windowSize={1}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          removeClippedSubviews={true}
        />
        {this.props.indicator && (
          <Indicator
            itemCount={this.props.data.length}
            currentIndex={this.state.index % this.props.data.length}
            indicatorStyle={this.props.indicatorStyle}
            indicatorContainerStyle={[
              styles.indicatorContainerStyle,
              this.props.indicatorContainerStyle,
            ]}
            indicatorActiveColor={this.props.indicatorActiveColor}
            indicatorInActiveColor={this.props.indicatorInActiveColor}
            indicatorActiveWidth={this.props.indicatorActiveWidth}
          />
        )}
      </View>
    );
  }

  onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      let currentIndex = viewableItems[0].index!;
      if (
        currentIndex % this.props.data.length === this.props.data.length - 1 &&
        this.props.loop
      ) {
        this.setState({
          index: currentIndex,
          data: [...this.state.data, ...this.props.data],
        });
      } else {
        this.setState({ index: currentIndex });
      }

      if (this.props.currentIndexCallback) {
        this.props.currentIndexCallback(currentIndex);
      }
    }
  };

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  changeSliderListIndex = () => {
    if (this.props.animation) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    this.setState({ index: this.state.index + 1 });
    this.slider.current?.scrollToIndex({
      index: this.state.index,
      animated: true,
    });
  };

  startAutoPlay = () => {
    this.sliderTimer = setInterval(
      this.changeSliderListIndex,
      this.props.timer
    );
  };

  stopAutoPlay = () => {
    if (this.sliderTimer) {
      clearInterval(this.sliderTimer);
      this.sliderTimer = null;
    }
  };
}

const styles = StyleSheet.create({
  image: {
    height: 230,
    resizeMode: 'stretch',
  },
  indicatorContainerStyle: {
    marginTop: 18,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
