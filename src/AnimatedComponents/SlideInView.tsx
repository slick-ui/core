import React, { FC } from 'react';
import { useEffect } from 'react';
import type { ViewProps } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Sizes } from '../metrics';

/**
 * @interface SlideInViewProps
 */
export interface SlideInViewProps extends Animated.AnimateProps<ViewProps> {
  delay?: number;
  direction?: 'horizontal' | 'vertical';
  index?: number;
}

/**
 * SlideInView
 */
const SlideInView: FC<SlideInViewProps> = ({
  style,
  delay = 100,
  direction = 'vertical',
  children,
  index,
  ...rest
}) => {
  const value = useSharedValue(0);

  useEffect(() => {
    value.value = withTiming(1, {
      duration: delay + (index || 0) * ((delay || 0) / 4),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    const translate = interpolate(
      value.value,
      [0, 1],
      [Sizes.SIZE_100, 0],
      Extrapolate.CLAMP
    );
    return direction === 'horizontal'
      ? { opacity: value.value, transform: [{ translateX: translate }] }
      : { opacity: value.value, transform: [{ translateY: translate }] };
  }, [direction]);
  return (
    <Animated.View {...rest} style={[style, animatedStyles]}>
      {children}
    </Animated.View>
  );
};

export default SlideInView;
