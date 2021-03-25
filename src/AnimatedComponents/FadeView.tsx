import React, { FC } from 'react';
import Animated, { set, useCode } from 'react-native-reanimated';
import type { StyleProp, ViewStyle } from 'react-native';
import { timing, useValue } from 'react-native-redash';

/**
 * @interface FadeViewProps
 */
interface FadeViewProps {
  /**
   * Styles for the view
   */
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
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
  style: styles,
  delay = 400,
  children,
}) => {
  //Animated Styles
  const opacity = useValue<number>(0);

  // Run Animation
  useCode(
    () => [
      set(
        opacity,
        timing({
          from: 0,
          to: 1,
          duration: delay,
        })
      ),
    ],
    []
  );

  // Style Object
  const style = [
    styles,
    {
      opacity,
    },
  ];

  return <Animated.View {...{ style }}>{children}</Animated.View>;
};

export default FadeView;
