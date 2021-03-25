import type { PressableProps, ViewProps, ViewStyle } from 'react-native';
import type Animated from 'react-native-reanimated';

/**
 * Inset
 */
export interface Inset {
  all?: number | string;
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  horizontal?: number | string;
  vertical?: number | string;
}

/**
 * AnimatedInset
 */
export interface AnimatedInset {
  all?: number | string | Animated.Node<number | string>;
  top?: number | string | Animated.Node<number | string>;
  bottom?: number | string | Animated.Node<number | string>;
  left?: number | string | Animated.Node<number | string>;
  right?: number | string | Animated.Node<number | string>;
  horizontal?: number | string | Animated.Node<number | string>;
  vertical?: number | string | Animated.Node<number | string>;
}

/**
 * BorderInset
 */
export interface BorderInset {
  all?: number;
  topLeft?: number;
  topRight?: number;
  bottomLeft?: number;
  bottomRight?: number;
}

/**
 * AnimatedBorderInset
 */
export interface AnimatedBorderInset {
  all?: number | Animated.Value<number>;
  topLeft?: number | Animated.Value<number>;
  topRight?: number | Animated.Value<number>;
  bottomLeft?: number | Animated.Value<number>;
  bottomRight?: number | Animated.Value<number>;
}

/**
 * BaseViewProps
 */
export interface BaseViewProps extends ViewProps {
  background?: string;
  padding?: Inset;
  margin?: Inset;
  flex?: number;
  height?: number | string;
  width?: number | string;
  border?: BorderInset;
}

/**
 * BaseViewProps
 */
export interface BasePressableProps extends PressableProps {
  background?: string;
  padding?: Inset;
  margin?: Inset;
  flex?: number;
  height?: number | string;
  width?: number | string;
  border?: BorderInset;
}

/**
 * BaseViewProps
 */
export interface BaseAnimatedViewProps
  extends Animated.AnimateProps<ViewStyle, ViewProps> {
  background?: string | Animated.Node<string>;
  padding?: AnimatedInset;
  margin?: AnimatedInset;
  width?: number | string | Animated.Value<number | string>;
  height?: number | string | Animated.Value<number | string>;
  flex?: number | Animated.Value<number>;
  border?: AnimatedBorderInset;
}

export const getMarginInset = (margin: Inset | AnimatedInset) => ({
  margin: margin.all,
  marginHorizontal: margin.horizontal,
  marginVertical: margin.vertical,
  marginLeft: margin.left,
  marginRight: margin.right,
  marginTop: margin.top,
  marginBottom: margin.bottom,
});

export const getPaddingInset = (padding: Inset | AnimatedInset) => ({
  padding: padding.all,
  paddingHorizontal: padding.horizontal,
  paddingVertical: padding.vertical,
  paddingLeft: padding.left,
  paddingRight: padding.right,
  paddingTop: padding.top,
  paddingBottom: padding.bottom,
});

export const getBorderRadius = (border: BorderInset | AnimatedBorderInset) =>
  ({
    borderRadius: border.all,
    borderTopRightRadius: border.topRight,
    borderTopLeftRadius: border.topLeft,
    borderBottomLeftRadius: border.bottomLeft,
    borderBottomRightRadius: border.bottomRight,
  } as ViewStyle);
