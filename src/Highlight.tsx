/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  Pressable,
  View,
  GestureResponderEvent,
} from 'react-native';
import Animated, { useValue, timing, Easing } from 'react-native-reanimated';
import {
  BasePressableProps,
  getBorderRadius,
  getMarginInset,
  getPaddingInset,
} from './baseProps';

/**
 * @interface HighlightProps
 */
export interface HighlightProps extends BasePressableProps {
  centered?: boolean;
  underlay?: string;
}

/**
 * Highlight
 */
const Highlight: FC<HighlightProps> = ({
  children,
  margin,
  padding,
  flex,
  border,
  style,
  centered,
  height,
  underlay = '#00000030',
  width,
  onPressOut,
  onPressIn,
  background,
  ...rest
}) => {
  const opacity = useValue(0);

  const animateIn = (e: GestureResponderEvent) => {
    timing(opacity, {
      toValue: 1,
      duration: 50,
      easing: Easing.linear,
    }).start();
    onPressIn?.(e);
  };

  const animateOut = (e: GestureResponderEvent) => {
    timing(opacity, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
    }).start();
    onPressOut?.(e);
  };

  return (
    <Pressable onPressIn={animateIn} onPressOut={animateOut} {...rest}>
      <View
        style={[
          style as StyleProp<ViewStyle>,
          // style,
          { overflow: 'hidden' },
          margin && (getMarginInset(margin) as StyleProp<ViewStyle>),
          padding && (getPaddingInset(padding) as StyleProp<ViewStyle>),
          border && (getBorderRadius(border) as StyleProp<ViewStyle>),
          centered && styles.alignCenter,
          {
            flex,
            backgroundColor: background,
            height,
            width,
          },
        ]}
      >
        {children}
        <Animated.View
          style={[styles.absolute, { backgroundColor: underlay, opacity }]}
        />
      </View>
    </Pressable>
  );
};

export default Highlight;

const styles = StyleSheet.create({
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
