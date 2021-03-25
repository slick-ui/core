import React, { FC } from 'react';
import type { TextProps as Props } from 'react-native';
import Animated from 'react-native-reanimated';
import { AnimatedInset, getMarginInset, getPaddingInset } from '../baseProps';

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

/**
 * @interface TextProps
 */
export interface TextProps extends Animated.AnimateProps<{}, Props> {
  color?: string | Animated.Node<string | undefined>;
  weight?: FontWeight | Animated.Node<FontWeight | undefined>;
  fontSize?: number | Animated.Node<number | undefined>;
  margin?: AnimatedInset;
  padding?: AnimatedInset;
  textTransform?:
    | 'none'
    | 'capitalize'
    | 'uppercase'
    | 'lowercase'
    | Animated.Node<
        'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined
      >;
  letterSpacing?: number | Animated.Node<number | undefined>;
  textAlign?:
    | 'left'
    | 'right'
    | 'center'
    | 'auto'
    | 'justify'
    | Animated.Node<
        'left' | 'right' | 'center' | 'auto' | 'justify' | undefined
      >;
  textAlignVertical?:
    | 'bottom'
    | 'top'
    | 'center'
    | 'auto'
    | Animated.Node<'bottom' | 'top' | 'center' | 'auto' | undefined>;
  lineHeight?: number | Animated.Node<number | undefined>;
  radius?: number | Animated.Node<number | undefined>;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | Animated.Node<
        | 'none'
        | 'underline'
        | 'line-through'
        | 'underline line-through'
        | undefined
      >;
  textRef?: React.LegacyRef<Animated.Text>;
  backgroundColor?: string | Animated.Node<string | undefined>;
}

/**
 * Text
 */
const Text: FC<TextProps> = ({
  children,
  textTransform,
  fontSize,
  color,
  weight = 'normal',
  margin,
  padding,
  textAlign,
  letterSpacing = 0.56,
  textAlignVertical,
  textDecorationLine,
  lineHeight,
  style,
  textRef,
  backgroundColor,
  radius,
  ...rest
}) => {
  return (
    <Animated.Text
      ref={textRef}
      {...rest}
      style={[
        {
          textTransform,
          textDecorationLine,
          color,
          fontWeight: weight,
          fontSize,
          letterSpacing,
          textAlign,
          lineHeight,
          textAlignVertical,
          backgroundColor,
          borderRadius: radius,
        },
        margin && (getMarginInset(margin) as AnimatedInset),
        padding && (getPaddingInset(padding) as AnimatedInset),
        style,
      ]}
    >
      {children}
    </Animated.Text>
  );
};

export default Text;
