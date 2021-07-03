import {
  runOnJS,
  useAnimatedGestureHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

/**
 * UseHighlightProps
 */
export interface UseHighlightProps {
  onPressIn?: () => void;
  onPress?: () => void;
  onPressOut?: () => void;
}
export const useHighlight = (props: UseHighlightProps) => {
  const {
    onPress = () => {},
    onPressIn = () => {},
    onPressOut = () => {},
  } = props;
  // Animated value for highlight
  const value = useSharedValue(0);

  // Event Handler for Tap Gesture Handler
  const eventHandler = useAnimatedGestureHandler(
    {
      onStart: () => {
        value.value = withTiming(1, { duration: 50 });
        runOnJS(onPressIn)();
      },
      onFail: () => {
        value.value = withTiming(0, { duration: 500 }, () => {
          runOnJS(onPressOut)();
        });
        runOnJS(onPressOut)();
      },
      onFinish: () => {
        value.value = withTiming(0, { duration: 500 }, () => {
          runOnJS(onPressOut)();
        });
      },
      onEnd: () => {
        value.value = withTiming(0, { duration: 500 }, () => {
          runOnJS(onPress)();
        });
      },
    },
    [onPress, onPressIn, onPressOut]
  );

  return { value, eventHandler };
};
