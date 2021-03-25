/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useEffect, useState } from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Value,
  Clock,
  useCode,
  set,
  cond,
  neq,
  and,
  not,
  clockRunning,
  call,
  interpolate,
} from 'react-native-reanimated';
import { timing } from 'react-native-redash';

const { height, width: WIDTH } = Dimensions.get('screen');

type Insets = 'never' | 'always';

/**
 * @export
 * @interface SlideModalProps
 */
export interface SlideModalProps {
  /**
   * @description Visibility of the modal
   * @type {boolean}
   * @memberof ModalProps
   */
  visible: boolean;
  /**
   * alginChildren
   * use this to align the child view to specific position
   * @type {('top' | 'bottom')}
   * @memberof SlideModalProps
   */
  alginChildren?: 'top' | 'bottom' | 'center';

  /**
   * @description Animation type of the modal
   * @requires animated
   * @type {(
   *     | 'slideInBottom'
   *     | 'slideInLeft'
   *     | 'slideInTop'
   *     | 'slideInRight')}
   * @memberof ModalProps
   * @default default (opacity)
   */
  animationType?:
    | 'slideInBottom'
    | 'slideInLeft'
    | 'slideInTop'
    | 'slideInRight';
  /**
   * @description Wether background press enabled
   * @type {boolean}
   * @memberof ModalProps
   * @default false
   */
  backgroundBackEnabled?: boolean;
  /**
   * @description Style of the sub view
   * @type {StyleProp<ViewStyle>}
   * @memberof ModalProps
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @description Function to call when backdrop is pressed
   * @memberof ModalProps
   * @requires backgroundBackEnabled to True
   */
  onBack: () => void;
  /**
   * Insets for SafeAreaView
   * @type {{top: Insets; bottom: Insets}}
   * @memberof ModalProps
   * @default {top: 'never', {bottom: 'never'}}
   */
  forceInset?: { top: Insets; bottom: Insets };
  /**
   * @description Animation Duration
   * @type {number}
   * @memberof ModalProps
   * @default 400
   */
  duration?: number;
  /**
   * @description backDrop  Color of the container
   * @type {string}
   * @memberof ModalProps
   * @default rgba(0,0,0,0.2)
   */
  backDropColor?: string;
  /**
   * @description modal style background color  Color of the container
   * @type {string}
   * @memberof ModalProps
   * @default  undefined
   */
  backgroundColor?: string;
  fullScreen?: boolean;
}

const SlideModal: React.FC<SlideModalProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  console.log('isVisible:', isVisible);
  // Props
  const {
    visible,
    alginChildren = 'bottom',
    backgroundBackEnabled = false,
    style = { width: '100%', height: '100%', backgroundColor: 'white' },
    duration = 400,
    animationType = 'slideInBottom',
    onBack,
    forceInset = { top: 'never', bottom: 'never' },
    children,
    fullScreen = false,
    backDropColor = 'rgba(0,0,0,0.2)',
    backgroundColor,
    ...rest
  } = props;

  useEffect(() => {
    console.log('visible:', visible);
    if (visible) {
      setIsVisible(visible);
    }
  }, [visible]);

  // Animation
  const { value, clock, animated } = useMemo(
    () => ({
      value: new Value(0),
      clock: new Clock(),
      animated: new Value(1),
    }),
    []
  );
  const opacity = value;

  const translateY = ['slideInLeft', 'SlideInRight'].includes(animationType)
    ? 0
    : interpolate(value, {
        inputRange: [0, 1],
        outputRange: [animationType === 'slideInTop' ? -height : height, 0],
      });
  const translateX = ['slideInTop', 'SlideInBottom'].includes(animationType)
    ? 0
    : interpolate(value, {
        inputRange: [0, 1],
        outputRange: [animationType === 'slideInLeft' ? -WIDTH : WIDTH, 0],
      });

  useCode(
    () => [
      cond(
        neq(animated, 0),
        [
          set(
            value,
            timing({
              from: value,
              to: visible ? 1 : 0,
              duration,
              easing: Easing.linear,
              clock,
            })
          ),
          cond(and(not(clockRunning(clock)), !visible ? 1 : 0), [
            call([], () => {
              setIsVisible(false);
            }),
          ]),
        ],
        set(value, visible ? 1 : 0)
      ),
    ],
    [visible]
  );

  return (
    <Modal
      {...rest}
      transparent
      onRequestClose={() => {
        if (visible) {
          onBack();
        }
      }}
      visible={isVisible}
    >
      <Animated.View
        {...{ forceInset }}
        pointerEvents={visible ? 'auto' : 'none'}
        style={[
          styles.topContainer,
          {
            opacity,
            justifyContent:
              alginChildren === 'top'
                ? 'flex-start'
                : alginChildren === 'bottom'
                ? 'flex-end'
                : 'center',
          },
        ]}
      >
        {!fullScreen && (
          <TouchableWithoutFeedback
            disabled={!backgroundBackEnabled}
            containerStyle={styles.back}
            style={[styles.inner, { backgroundColor: backDropColor }]}
            onPress={onBack}
          />
        )}

        <Animated.View
          style={[
            style,
            {
              position: 'absolute',
              backgroundColor,
            },
            fullScreen && {
              flex: 1,
            },
            (animationType === 'slideInBottom' ||
              animationType === 'slideInTop') && {
              transform: [{ translateY }],
            },
            (animationType === 'slideInLeft' ||
              animationType === 'slideInRight') && {
              transform: [{ translateX }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default SlideModal;

const styles = StyleSheet.create({
  topContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  back: {
    width: '100%',
    height: ' 100%',
    backgroundColor: 'transparent',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  inner: {
    flex: 1,
  },
});
