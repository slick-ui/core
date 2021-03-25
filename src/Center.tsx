/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import { View } from 'react-native';
import {
  BaseViewProps,
  getMarginInset,
  getPaddingInset,
  Inset,
} from './baseProps';

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
        {
          flex,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: background,
          width,
          height,
        },
        margin && (getMarginInset(margin) as Inset),
        padding && (getPaddingInset(padding) as Inset),
      ]}
    >
      {children}
    </View>
  );
};

export default Center;
