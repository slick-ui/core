/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useColors } from '../../Colors';
import React, { useRef } from 'react';
import { Animated, ViewProps } from 'react-native';
import { AnimationContext } from './context';

const START_VALUE = 0.5;
const END_VALUE = 1;
const useNativeDriver = true;
const isInteraction = false;

export interface FadeProps extends ViewProps {
  /* Animation duration, default is 500 */
  duration?: number;
  animationValue?: React.MutableRefObject<Animated.Value>;
}

export const Fade: React.FC<FadeProps> = ({
  duration = 500,
  children,
  animationValue,
  style,
}) => {
  const animation = animationValue || useRef(new Animated.Value(START_VALUE));
  const colors = useColors();

  const start = () => {
    Animated.sequence([
      Animated.timing(animation.current, {
        duration,
        isInteraction,
        toValue: END_VALUE,
        useNativeDriver,
      }),
      Animated.timing(animation.current, {
        duration,
        isInteraction,
        toValue: START_VALUE,
        useNativeDriver,
      }),
    ]).start((e) => {
      if (e.finished) {
        start();
      }
    });
  };

  React.useEffect(() => {
    start();
  }, []);

  const animationStyle = {
    backgroundColor: colors.lightText + 60,
    height: '100%',
    opacity: animation.current,
  };

  return (
    <AnimationContext.Provider value={[animationStyle, style]}>
      {children}
    </AnimationContext.Provider>
  );
};
