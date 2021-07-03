import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle, StyleSheet, Modal } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSlideHook } from './hooks';

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
  // Props
  const {
    visible,
    alginChildren = 'bottom',
    backgroundBackEnabled = false,
    style = { width: '100%', height: '100%', backgroundColor: 'white' },
    duration = 250,
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
    if (visible) {
      setIsVisible(visible);
    }
  }, [visible]);

  // Animation Values
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, translateX, translateY] = useSlideHook(
    visible,
    duration,
    animationType,
    ([val]) => {
      if (val !== 0) return;
      setIsVisible(false);
    }
  );

  // animated styles
  const animatedStyles = useAnimatedStyle(() => ({
    // opacity: value.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

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
            animatedStyles,
            style,
            {
              backgroundColor,
            },
            fullScreen && {
              flex: 1,
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
  modal: {
    position: 'absolute',
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
