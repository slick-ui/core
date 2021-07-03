import React, { FC } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { ViewProps } from 'react-native';
import { useEffect } from 'react';

/**
 * @interface FadeViewProps
 */
export interface FadeViewProps extends Animated.AnimateProps<ViewProps> {
  /**
   * Delay for the animation
   * default 400
   */
  delay?: number;
}

/**
 * FadeView
 */
const FadeView: FC<FadeViewProps> = ({
  style,
  delay = 400,
  children,
  ...rest
}) => {
  //Animated Styles
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: delay });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Style Object
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View {...rest} style={[style, animatedStyles]}>
      {children}
    </Animated.View>
  );
};

export default FadeView;
