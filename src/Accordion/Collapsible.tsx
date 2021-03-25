/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import {
  Animated,
  EasingFunction,
  LayoutChangeEvent,
  StyleProp,
  Easing,
  ViewStyle,
} from 'react-native';

/**
 * CollapsibleProps
 */
export interface CollapsibleProps {
  align?: 'top' | 'center' | 'bottom';
  collapsed?: boolean;
  collapsedHeight?: number;
  enablePointerEvents?: boolean;
  duration?: number;
  easing?: EasingFunction;
  style?: StyleProp<ViewStyle>;
  onAnimationEnd?: () => void;
}

interface CollapsibleState {
  measuring: boolean;
  measured: boolean;
  height: Animated.Value;
  contentHeight: number;
  animating: boolean;
}

export default class Collapsible extends Component<
  CollapsibleProps,
  CollapsibleState
> {
  static defaultProps = {
    align: 'top',
    collapsed: true,
    collapsedHeight: 0,
    enablePointerEvents: false,
    duration: 300,
    easing: Easing.cubic,
    onAnimationEnd: () => null,
  };

  unmounted: boolean = false;
  private _animation: any;

  constructor(props: CollapsibleProps | Readonly<CollapsibleProps>) {
    super(props);
    this.state = {
      measuring: false,
      measured: false,
      height: new Animated.Value(props.collapsedHeight || 0),
      contentHeight: 0,
      animating: false,
    };
  }

  componentDidUpdate(prevProps: { collapsed: boolean }) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this.setState({ measured: false }, () =>
        this._componentDidUpdate(prevProps)
      );
    } else {
      this._componentDidUpdate(prevProps);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  _componentDidUpdate(prevProps: {
    collapsed: boolean;
    collapsedHeight?: number;
  }) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this._toggleCollapsed(this.props.collapsed!);
    } else if (
      this.props.collapsed &&
      prevProps.collapsedHeight !== this.props.collapsedHeight
    ) {
      this.state.height.setValue(this.props.collapsedHeight || 0);
    }
  }

  contentHandle: {
    measure: (x: number, y: number, width: number, height: number) => void;
    getNode: any;
  } | null = null;

  _handleRef = (ref: any) => {
    this.contentHandle = ref;
  };

  _measureContent(callback: (val: number) => void) {
    this.setState(
      {
        measuring: true,
      },
      () => {
        requestAnimationFrame(() => {
          if (!this.contentHandle) {
            this.setState(
              {
                measuring: false,
              },
              () => callback(this.props.collapsedHeight || 0)
            );
          } else {
            let ref;
            if (typeof this.contentHandle?.measure === 'function') {
              ref = this.contentHandle;
            } else {
              ref = this.contentHandle.getNode();
            }
            ref.measure(
              (__: number, ___: number, _: number, height: number) => {
                this.setState(
                  {
                    measuring: false,
                    measured: true,
                    contentHeight: height,
                  },
                  () => callback(height)
                );
              }
            );
          }
        });
      }
    );
  }

  _toggleCollapsed(collapsed: boolean) {
    if (collapsed) {
      this._transitionToHeight(this.props.collapsedHeight || 0);
    } else if (!this.contentHandle) {
      if (this.state.measured) {
        this._transitionToHeight(this.state.contentHeight);
      }
      return;
    } else {
      this._measureContent((contentHeight) => {
        this._transitionToHeight(contentHeight);
      });
    }
  }

  _transitionToHeight(height: number) {
    const { duration, easing, onAnimationEnd } = this.props;

    if (this._animation) {
      this._animation.stop();
    }
    this.setState({ animating: true });
    this._animation = Animated.timing(this.state.height, {
      useNativeDriver: false,
      toValue: height,
      duration,
      easing: easing || Easing.linear,
    }).start(() => {
      if (this.unmounted) {
        return;
      }
      this.setState({ animating: false }, () => {
        if (this.unmounted) {
          return;
        }
        onAnimationEnd?.();
      });
    });
  }

  _handleLayoutChange = (event: LayoutChangeEvent) => {
    const contentHeight = event.nativeEvent.layout.height;
    if (
      this.state.animating ||
      this.props.collapsed ||
      this.state.measuring ||
      this.state.contentHeight === contentHeight
    ) {
      return;
    }

    this.state.height.setValue(contentHeight);
    this.setState({ contentHeight });
  };

  render() {
    const { collapsed, enablePointerEvents } = this.props;
    const { height, contentHeight, measuring, measured } = this.state;
    const hasKnownHeight = !measuring && (measured || collapsed);
    const style: Animated.WithAnimatedObject<ViewStyle> = hasKnownHeight
      ? {
          overflow: 'hidden',
          height: height,
        }
      : {};
    const contentStyle: Animated.WithAnimatedObject<ViewStyle> = {};
    if (measuring) {
      contentStyle.position = 'absolute';
      contentStyle.opacity = 0;
    } else if (this.props.align === 'center') {
      contentStyle.transform = [
        {
          translateY: height.interpolate({
            inputRange: [0, contentHeight],
            outputRange: [contentHeight / -2, 0],
          }),
        },
      ];
    } else if (this.props.align === 'bottom') {
      contentStyle.transform = [
        {
          translateY: height.interpolate({
            inputRange: [0, contentHeight],
            outputRange: [-contentHeight, 0],
          }),
        },
      ];
    }
    return (
      <Animated.View
        style={style}
        pointerEvents={!enablePointerEvents && collapsed ? 'none' : 'auto'}
      >
        <Animated.View
          ref={this._handleRef}
          style={[this.props.style, contentStyle]}
          onLayout={this.state.animating ? undefined : this._handleLayoutChange}
        >
          {this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}
