import { useEffect } from 'react';
import Animated, {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

/**
 * use Popup Hook
 * used to get the value, scale value by visibility
 *
 * @param visible boolean  Required
 *
 * @param duration number
 * @default 400
 *
 * @param callback Callback to call when animation is finished
 *
 * ```
 *
 * Eg:
 *
 * const [value, scale] = usePopupHook(visible, 400)
 * ```
 */
export const usePopupHook = (
  visible: boolean,
  duration?: number,
  callback?: (args: readonly number[]) => void
) => {
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
  }, [visible, duration, value, callback]);

  return [value] as [Animated.SharedValue<number>];
};
