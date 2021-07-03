import React, { FC } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { useHighlight } from './hooks';

/**
 * @interface ReButtonProps
 *
 */
interface ReButtonProps extends Animated.AnimateProps<ViewProps> {
  /**
   * overlay color
   * @memberof ReButtonProps
   * @param overlayColor
   * @defaults '#00000040'
   */
  overlayColor?: string;
  /**
   * function to call when button is pressed
   * @memberof ReButtonProps
   * @param onPress
   * @defaults () => void
   */
  onPress?: () => void;
  /**
   * function to call when button is pressed In
   * @memberof ReButtonProps
   * @param onPressIn
   * @defaults () => void
   */
  onPressIn?: () => void;
  /**
   * function to call when button is pressed Out
   * @memberof ReButtonProps
   * @param onPressOut
   * @defaults () => void
   */
  onPressOut?: () => void;
  /**
   * param which defines weather the button is Pressable or not
   * @memberof ReButtonProps
   * @param disabled
   * @defaults () => void
   */
  disabled?: boolean;
}

/**
 * ReButton
 */
const ReButton: FC<ReButtonProps> = (props) => {
  const {
    children,
    overlayColor = '#00000040',
    onPress,
    onPressIn,
    disabled = false,
    onPressOut,
    ...dataProps
  } = props;

  const { value, eventHandler } = useHighlight({
    onPress,
    onPressIn,
    onPressOut,
  });

  // Animated style for the highlight
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: value.value,
    backgroundColor: overlayColor,
  }));

  return (
    <TapGestureHandler
      shouldCancelWhenOutside
      enabled={!disabled}
      onGestureEvent={eventHandler as any}
    >
      <Animated.View {...dataProps}>
        {children}
        <Animated.View
          pointerEvents="none"
          style={[styles.container, animatedStyle]}
        />
      </Animated.View>
    </TapGestureHandler>
  );
};

export default ReButton;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
