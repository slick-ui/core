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
export interface TextProps extends Animated.AnimateProps<Props> {
  color?: string;
  weight?: FontWeight;
  fontSize?: number;
  margin?: AnimatedInset;
  padding?: AnimatedInset;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  letterSpacing?: number;
  textAlign?: 'left' | 'right' | 'center' | 'auto' | 'justify';

  textAlignVertical?: 'bottom' | 'top' | 'center' | 'auto';

  lineHeight?: number;
  radius?: number;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';

  textRef?: React.LegacyRef<Animated.Text>;
  backgroundColor?: string;
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
