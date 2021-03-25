import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  BaseViewProps,
  getMarginInset,
  getPaddingInset,
  Inset,
} from './baseProps';

/**
 * @interface CircleProps
 */
export interface CircleProps extends BaseViewProps {
  radius: number;
  centered?: boolean;
}

/**
 * Circle
 */
const Circle: FC<CircleProps> = ({
  radius,
  children,
  style,
  background,
  margin,
  padding,
  flex,
  centered,
  ...rest
}) => {
  return (
    <View
      {...rest}
      style={[
        style,
        {
          flex,
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          backgroundColor: background,
        },
        margin && (getMarginInset(margin) as Inset),
        padding && (getPaddingInset(padding) as Inset),
        centered && styles.centered,
      ]}
    >
      {children}
    </View>
  );
};

export default Circle;

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
