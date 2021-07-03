import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle, StyleSheet, Modal } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { usePopupHook } from './hooks';

type Insets = 'never' | 'always';

/**
 * @export
 * @interface PopupModalProps
 */
export interface PopupModalProps {
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
   *     | 'popIn'
   *     | 'popOut')}
   * @memberof ModalProps
   * @default default (opacity)
   */
  animationType?: 'popIn' | 'popOut';
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

const SlideModal: React.FC<PopupModalProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  // Props
  const {
    visible,
    alginChildren = 'center',
    backgroundBackEnabled = false,
    style = { width: '100%', height: '100%', backgroundColor: 'white' },
    duration = 400,
    animationType = 'popIn',
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

  // Animation
  const [opacity] = usePopupHook(visible, duration, ([val]) => {
    if (val !== 0) return;
    setIsVisible(false);
  });

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const childAnimatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      opacity.value,
      [0, 1],
      animationType === 'popIn' ? [1.2, 1] : [1, 1.2],
      Extrapolate.CLAMP
    );
    return {
      opacity: opacity.value,
      transform: [{ scale }],
    };
  });

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
            alignItems: 'center',
            justifyContent:
              alginChildren === 'top'
                ? 'flex-start'
                : alginChildren === 'bottom'
                ? 'flex-end'
                : 'center',
          },
          animatedStyles,
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
            {
              position: 'absolute',
              backgroundColor,
            },
            style,
            fullScreen && {
              flex: 1,
            },
            childAnimatedStyles,
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
