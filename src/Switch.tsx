/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import { View } from 'react-native';
import { useColors } from './Colors';

/**
 * @interface SwitchProps
 */
export interface SwitchProps {
  isOn: boolean;
  size?: number;
  activeColor?: string;
  inActiveColor?: string;
}

/**
 * Switch
 */
const Switch: FC<SwitchProps> = ({
  isOn = false,
  size = 30,
  activeColor,
  inActiveColor,
}) => {
  const colors = useColors();
  const aColor = activeColor || colors.primary;
  const iAColors = inActiveColor || colors.lightBackground;
  return (
    <View
      style={{
        width: size + 20,
        height: size,
        borderRadius: size,
        borderWidth: 2,
        borderColor: isOn ? aColor : iAColors,
        backgroundColor: isOn ? aColor : iAColors,
        justifyContent: 'center',
        padding: 1,
        alignItems: isOn ? 'flex-end' : 'flex-start',
      }}
    >
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: '#fff',
          height: '100%',
          aspectRatio: 1 / 1,
          borderRadius: (size - 4) / 2,
        }}
      />
    </View>
  );
};

export default Switch;
