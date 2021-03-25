import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import Indicator, { IndicatorProps } from './Indicator';
import styles from './styles';

/**
 * PulseIndicatorProps
 */
export interface PulseIndicatorProps extends IndicatorProps {
  color: string;
  size: number;
}
export default class PulseIndicator extends PureComponent<PulseIndicatorProps> {
  static defaultProps = {
    animationEasing: Easing.out(Easing.ease),

    color: 'rgb(0, 0, 0)',
    size: 40,
  };

  constructor(props: PulseIndicatorProps | Readonly<PulseIndicatorProps>) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({
    index,
    progress,
  }: {
    index: number;
    count: number;
    progress: Animated.Value;
  }) {
    let { size, color } = this.props;

    let pulseStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: color,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 0.67, 1],
            outputRange: index ? [0.4, 0.6, 0.4] : [0.4, 0.6, 1.0],
          }),
        },
      ],
      opacity: progress.interpolate({
        inputRange: [0, 0.67, 1],
        outputRange: index ? [1.0, 1.0, 1.0] : [0.5, 0.5, 0.0],
      }),
    };

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={pulseStyle} />
      </Animated.View>
    );
  }

  render() {
    let { style, size: width, size: height, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height }}
          {...props}
          renderComponent={this.renderComponent}
          count={2}
        />
      </View>
    );
  }
}
