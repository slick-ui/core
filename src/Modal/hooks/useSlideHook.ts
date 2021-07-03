import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type UserSliderHook = (
  visible: boolean,
  duration?: number,
  animationType?:
    | 'slideInBottom'
    | 'slideInLeft'
    | 'slideInTop'
    | 'slideInRight',
  callback?: (args: readonly number[]) => void
) => [
  Animated.SharedValue<number>,
  Animated.SharedValue<number>,
  Animated.SharedValue<number>
];

/**
 * use Slide Hook
 * used to get the value, translateX, translateY value by visibility
 *
 * @param visible boolean  Required
 *
 * @param duration number
 * @default 400
 *
 * @param animationType ``slideInBottom``, ``slideInLeft``, ``slideInTop``, ``slideInRight``
 * @default slideInBottom
 *
 * @param callback Callback to call when animation is finished
 *
 * ```
 *
 * Eg:
 *
 * const [value, translateX, translateY] = useSlideHook(visible, 400, 'slideInBottom')
 * ```
 */
export const useSlideHook: UserSliderHook = (
  visible,
  duration = 400,
  animationType = 'slideInBottom',
  callback
) => {
  const { height, width } = useWindowDimensions();

  // Animation Value
  const value = useSharedValue(0);

  useEffect(() => {
    value.value = withTiming(
      visible ? 1 : 0,
      {
        duration,
        easing: Easing.linear,
      },
      (finished) => {
        if (!finished || !callback) return;
        runOnJS(callback)([value.value]);
      }
    );
  }, [callback, duration, value, visible]);

  const translateY = useDerivedValue(() => {
    return ['slideInLeft', 'slideInRight'].includes(animationType)
      ? 0
      : interpolate(
          value.value,
          [0, 1],
          [animationType === 'slideInTop' ? -height : height, 0]
        );
  });
  const translateX = useDerivedValue(() => {
    return ['slideInTop', 'slideInBottom'].includes(animationType)
      ? 0
      : interpolate(
          value.value,
          [0, 1],
          [animationType === 'slideInLeft' ? -width : width, 0]
        );
  });

  return [value, translateX, translateY];
};
