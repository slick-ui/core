/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import type { TextProps as Props } from 'react-native';
import { Text as RNText } from 'react-native';
import { getMarginInset, getPaddingInset, Inset } from '../baseProps';

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
export interface TextProps extends Props {
  color?: string;
  weight?: FontWeight;
  fontSize?: number;
  margin?: Inset;
  padding?: Inset;
  family?: string;
  italic?: boolean;
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
  textRef?: React.LegacyRef<RNText>;
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
  italic,
  letterSpacing = 0.56,
  textAlignVertical,
  textDecorationLine,
  lineHeight,
  style,
  textRef,
  family: fontFamily,
  backgroundColor,
  radius,
  ...rest
}) => {
  return (
    <RNText
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
          fontFamily,
          fontStyle: italic ? 'italic' : 'normal',
          borderRadius: radius,
        },
        margin && (getMarginInset(margin) as Inset),
        padding && (getPaddingInset(padding) as Inset),
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

export default Text;
