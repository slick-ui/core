/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { BaseViewProps, getMarginInset, getPaddingInset } from './baseProps';

/**
 * @interface CenterProps
 */
export interface CenterProps extends BaseViewProps {
  width?: number | string;
  height?: number | string;
}

/**
 * Center
 */
const Center: FC<CenterProps> = ({
  children,
  style,
  background,
  margin,
  padding,
  flex,
  width,
  height,
  ...rest
}) => {
  return (
    <View
      {...rest}
      style={[
        style,
        flex ? { flex } : {},
        width ? { width } : {},
        height ? { height } : {},
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: background,
        },

        margin && (getMarginInset(margin) as StyleProp<ViewStyle>),
        padding && (getPaddingInset(padding) as StyleProp<ViewStyle>),
      ]}
    >
      {children}
    </View>
  );
};

export default Center;
