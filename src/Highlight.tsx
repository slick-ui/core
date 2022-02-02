/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
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
  const opacity = useSharedValue(0);

  const animateIn = (e: GestureResponderEvent) => {
    opacity.value = withTiming(1, { duration: 50 });
    onPressIn?.(e);
  };

  const animateOut = (e: GestureResponderEvent) => {
    opacity.value = withTiming(0, { duration: 400 });
    onPressOut?.(e);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Pressable
      onPressIn={animateIn}
      onPressOut={animateOut}
      {...rest}
      style={[
        style as StyleProp<ViewStyle>,
        {
          overflow: 'hidden',
          backgroundColor: background,
        },
        margin && (getMarginInset(margin) as StyleProp<ViewStyle>),
        padding && (getPaddingInset(padding) as StyleProp<ViewStyle>),
        border && (getBorderRadius(border) as StyleProp<ViewStyle>),
        centered && styles.alignCenter,
        flex ? { flex } : {},
        width ? { width } : {},
        height ? { height } : {},
      ]}
    >
      {children}
      <Animated.View
        pointerEvents="none"
        style={[styles.absolute, animatedStyles, { backgroundColor: underlay }]}
      />
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
