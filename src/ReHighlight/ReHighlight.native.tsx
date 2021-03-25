import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Easing, timing, useValue } from 'react-native-reanimated';
import {
  Inset,
  BaseAnimatedViewProps,
  getPaddingInset,
  getMarginInset,
  getBorderRadius,
} from '../baseProps';

export interface Props extends BaseAnimatedViewProps {
  /**
   * Function To Call When Button is Pressed
   * @memberof Props
   */
  onPress?: () => void;
  /**
   * Defines Weather Button is Disabled
   * @type {boolean}
   * @memberof Props
   * @default false
   */
  disabled?: boolean;
  /**
   * Function to Call When Button is Pressed In
   * @memberof Props
   */
  onPressIn?: () => void;
  /**
   * Function to Call When Button is Pressed Out
   * @memberof Props
   */
  onPressOut?: () => void;
  margin?: Inset;
  padding?: Inset;
  viewRef?:
    | string
    | ((instance: Animated.View | null) => void)
    | React.RefObject<Animated.View>
    | null;
  underlay?: string;
}

/**
 * Re Highlight
 */
const ReHighlight: FC<Props> = ({
  onPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  children,
  underlay = '#00000030',
  padding,
  margin,
  viewRef,
  style,
  width,
  height,
  flex,
  border,
  disabled = false,
  ...rest
}) => {
  const opacity = useValue(0);

  const animateIn = () => {
    timing(opacity, {
      toValue: 1,
      duration: 50,
      easing: Easing.linear,
    }).start();
  };

  const animateOut = () => {
    timing(opacity, {
      toValue: 0,
      duration: 400,
      easing: Easing.linear,
    }).start();
  };

  const viewStyle = {
    backgroundColor: underlay,
    opacity,
  };

  return (
    <TapGestureHandler
      shouldCancelWhenOutside
      enabled={!disabled}
      onHandlerStateChange={({ nativeEvent: { state } }) => {
        if (state === State.BEGAN) {
          animateIn();
          onPressIn();
        } else if (state === State.END) {
          animateOut();
          onPress();
        } else if (state === State.CANCELLED || state === State.FAILED) {
          animateOut();
          onPressOut();
        }
      }}
    >
      <Animated.View
        {...rest}
        ref={viewRef}
        pointerEvents={!disabled ? undefined : 'none'}
        style={[
          style,
          // eslint-disable-next-line react-native/no-inline-styles
          { overflow: 'hidden' },
          margin && getMarginInset(margin),
          padding && getPaddingInset(padding),
          border && getBorderRadius(border),
          { flex, width, height },
        ]}
      >
        {children}
        <Animated.View
          pointerEvents="none"
          style={[styles.overlay, viewStyle]}
        />
      </Animated.View>
    </TapGestureHandler>
  );
};

export default ReHighlight;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
