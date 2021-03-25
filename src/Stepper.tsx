/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Icon from './Icon';
import { Text } from './Text';
import { widthPercentageToDP } from './sizing';
import { useColors } from './Colors';
import { Sizes } from './metrics';

/**
 * @interface StepperProps
 */
export interface StepperProps {
  activeStep: number;
  steps: string[];
  style?: StyleProp<ViewStyle>;
}

const BoxHeight = Sizes.SIZE_100;
const CircleSize = Sizes.SIZE_40;

/**
 * Stepper
 */
const Stepper: FC<StepperProps> = ({ activeStep, steps, style }) => {
  // colors
  const colors = useColors();

  return (
    <View style={[styles.container, style]}>
      {steps.map((step, key) => {
        const isActive = activeStep - 1 === key;
        return (
          <View
            {...{ key }}
            style={[
              styles.stepContainer,
              key === steps.length - 1 && { height: CircleSize },
            ]}
          >
            <View style={[styles.boxContainer]}>
              <View
                style={[
                  styles.step,
                  {
                    backgroundColor: isActive
                      ? colors.background
                      : key < activeStep
                      ? colors.success
                      : colors.background,
                    borderColor: isActive
                      ? colors.success
                      : key < activeStep
                      ? colors.success
                      : colors.lightText,
                  },
                ]}
              >
                {activeStep > key + 1 && (
                  <Icon
                    size={widthPercentageToDP('4%')}
                    name="ios-checkmark"
                    color={colors.darkText}
                  />
                )}
              </View>
              {key !== steps.length - 1 && (
                <View
                  style={[
                    styles.line,
                    {
                      borderLeftWidth: key <= activeStep - 2 ? 1 : undefined,
                      borderWidth: key <= activeStep - 2 ? undefined : 0.6,
                      borderColor:
                        key <= activeStep - 2
                          ? colors.success
                          : colors.lightText,
                      borderStyle: key <= activeStep - 2 ? 'solid' : 'dashed',
                      borderRadius: 0.4,
                    },
                  ]}
                />
              )}
            </View>

            <View style={styles.stepTextContainer}>
              <Text
                color={key < activeStep ? colors.success : colors.lightText}
                {...{ key }}
              >
                {step}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingVertical: 10,
  },
  stepContainer: {
    alignSelf: 'stretch',
    height: BoxHeight,
    flexDirection: 'row',
  },
  boxContainer: {
    width: CircleSize,
    height: '100%',
    alignItems: 'center',
  },
  step: {
    width: CircleSize,
    height: CircleSize,
    borderRadius: CircleSize / 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 0,
    height: '100%',
  },
  stepTextContainer: {
    flex: 1,
    paddingHorizontal: Sizes.SIZE_20,
    paddingTop: Sizes.SIZE_10,
  },
});
