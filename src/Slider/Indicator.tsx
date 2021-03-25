import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Sizes } from '../metrics';

/**
 * IndicatorProps
 */
export interface IndicatorProps {
  itemCount: number;
  currentIndex: number;
  indicatorStyle?: StyleProp<ViewStyle>;
  indicatorContainerStyle?: StyleProp<ViewStyle>;
  indicatorActiveColor: string;
  indicatorInActiveColor: string;
  indicatorActiveWidth?: number;
}

/**
 * Indicator
 */
export default ({
  itemCount,
  currentIndex,
  indicatorStyle,
  indicatorContainerStyle,
  indicatorActiveColor,
  indicatorInActiveColor,
  indicatorActiveWidth = Sizes.SIZE_6,
}: IndicatorProps) => {
  return (
    <View style={[styles.container, indicatorContainerStyle]}>
      {renderIndicator(
        itemCount,
        currentIndex,
        indicatorStyle,
        indicatorActiveColor,
        indicatorInActiveColor,
        indicatorActiveWidth
      )}
    </View>
  );
};

export const renderIndicator = (
  count: number,
  currentIndex: number,
  indicatorStyle: StyleProp<ViewStyle>,
  indicatorActiveColor: string,
  indicatorInActiveColor: string,
  indicatorActiveWidth: number
) => {
  let indicators = [];
  for (let i = 0; i < count; i++) {
    indicators.push(
      <View
        style={[
          styles.indicator,
          indicatorStyle,
          i === currentIndex
            ? indicatorActiveColor
              ? {
                  ...styles.active,
                  ...{
                    backgroundColor: indicatorActiveColor,
                    width: indicatorActiveWidth,
                  },
                }
              : styles.active
            : {
                ...styles.inactive,
                ...{ backgroundColor: indicatorInActiveColor },
              },
        ]}
        key={i.toString()}
      />
    );
  }
  return indicators;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  indicator: {
    width: Sizes.SIZE_6,
    height: Sizes.SIZE_6,
    borderRadius: Sizes.SIZE_3,
    marginRight: Sizes.SIZE_5,
  },
  active: {},
  inactive: {},
});
