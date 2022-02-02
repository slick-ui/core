import React, { PureComponent, ReactNode } from 'react';
import { Animated, Easing, EasingFunction } from 'react-native';

/**
 * IndicatorProps
 */
export interface IndicatorProps {
  animationEasing?: EasingFunction;
  animationDuration?: number;
  hideAnimationDuration?: number;
  animating?: boolean;
  interaction?: boolean;
  hidesWhenStopped?: boolean;
  renderComponent?: (data: {
    index: number;
    count: number;
    progress: Animated.Value;
  }) => ReactNode;
  count?: number;
  style?: any;
}

interface IndicatorState {
  hideAnimation: Animated.Value;
  progress: Animated.Value;
}

export default class Indicator extends PureComponent<
  IndicatorProps,
  IndicatorState
> {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    hideAnimationDuration: 200,
    animating: true,
    interaction: true,
    hidesWhenStopped: true,
    count: 1,
  };
  animationState: number;
  savedValue: number;

  constructor(props: IndicatorProps | Readonly<IndicatorProps>) {
    super(props);

    /*
     *  0 -> 1
     *    | startAnimation
     *    | resumeAnimation
     *
     *  1 -> -1
     *    | stopAnimation
     *
     * -1 -> 0
     *    | saveAnimation
     */
    this.animationState = 0;
    this.savedValue = 0;

    let { animating } = this.props;

    this.state = {
      progress: new Animated.Value(0),
      hideAnimation: new Animated.Value(animating ? 1 : 0),
    };
  }

  componentDidMount() {
    let { animating } = this.props;

    if (animating) {
      this.startAnimation();
    }
  }

  componentDidUpdate(prevProps: IndicatorProps | Readonly<IndicatorProps>) {
    let { animating } = this.props;

    if (animating && !prevProps.animating) {
      this.resumeAnimation();
    }

    if (!animating && prevProps.animating) {
      this.stopAnimation();
    }

    if (animating !== prevProps.animating) {
      let { hideAnimation } = this.state;
      let { hideAnimationDuration: duration } = this.props;

      Animated.timing(hideAnimation, {
        toValue: animating ? 1 : 0,
        duration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }

  startAnimation() {
    let { progress } = this.state;
    let { interaction, animationEasing, animationDuration } = this.props;

    if (this.animationState !== 0) {
      return;
    }

    let animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1,
    });

    Animated.loop(animation).start();

    this.animationState = 1;
  }

  stopAnimation() {
    let { progress } = this.state;

    if (this.animationState !== 1) {
      return;
    }

    let listener = progress.addListener(({ value }) => {
      progress.removeListener(listener);
      progress.stopAnimation(() => this.saveAnimation(value));
    });

    this.animationState = -1;
  }

  saveAnimation(value: number) {
    let { animating } = this.props;

    this.savedValue = value;
    this.animationState = 0;

    if (animating) {
      this.resumeAnimation();
    }
  }

  resumeAnimation() {
    let { progress } = this.state;
    let { interaction, animationDuration } = this.props;

    if (this.animationState !== 0) {
      return;
    }

    Animated.timing(progress, {
      useNativeDriver: true,
      isInteraction: interaction,
      duration: (1 - this.savedValue) * animationDuration!,
      toValue: 1,
    }).start(({ finished }) => {
      if (finished) {
        progress.setValue(0);

        this.animationState = 0;
        this.startAnimation();
      }
    });

    this.savedValue = 0;
    this.animationState = 1;
  }

  renderComponent(_: any, index: number) {
    let { progress } = this.state;
    let { renderComponent, count = 4 } = this.props;

    if (typeof renderComponent === 'function') {
      return renderComponent({ index, count, progress });
    }

    return null;
  }

  render() {
    let { hideAnimation } = this.state;
    let { count, hidesWhenStopped, ...props } = this.props;

    if (hidesWhenStopped) {
      props.style = [].concat(props.style || [], {
        opacity: hideAnimation,
      } as any) as any;
    }

    return (
      <Animated.View {...props}>
        {Array.from(new Array(count), this.renderComponent, this)}
      </Animated.View>
    );
  }
}
