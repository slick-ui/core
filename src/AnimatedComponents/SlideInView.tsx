import React, { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  set,
  useCode,
} from 'react-native-reanimated';
import { timing, useValue } from 'react-native-redash';
import { Sizes } from '../metrics';

/**
 * @interface SlideInViewProps
 */
interface SlideInViewProps {
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  delay?: number;
  direction?: 'horizontal' | 'vertical';
  index?: number;
}

/**
 * SlideInView
 */
const SlideInView: FC<SlideInViewProps> = ({
  style: st,
  delay = 100,
  direction = 'vertical',
  children,
  index,
}) => {
  const value = useValue<number>(0);

  console.log(
    'delay + (index || 0) + delay :',
    index,
    delay + (index || 0) + delay
  );
  useCode(
    () => [
      set(
        value,
        timing({
          to: 1,
          duration: delay + (index || 0) * ((delay || 0) / 4),
        })
      ),
    ],
    []
  );

  const translate = interpolate(value, {
    inputRange: [0, 1],
    outputRange: [Sizes.SIZE_100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const style: StyleProp<Animated.AnimateStyle<ViewStyle>> = [
    st,
    { opacity: value },
    direction === 'horizontal'
      ? { transform: [{ translateX: translate }] }
      : { transform: [{ translateY: translate }] },
  ];
  return <Animated.View {...{ style }}>{children}</Animated.View>;
};

export default SlideInView;
