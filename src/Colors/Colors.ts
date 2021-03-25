import { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeContext } from '../Theme';

/**
 * BaseColors
 *
 * ```
 * primary
 * secondary
 * darkText
 * lightText
 * background
 * lightBackground
 * ```
 */
export interface BaseColors {
  primary: string;
  secondary: string;
  darkText: string;
  lightText: string;
  background: string;
  lightBackground: string;
  underlay: string;
  success: string;
}

/**
 * Light Colors
 */
export const lightColors: BaseColors = {
  primary: 'blue',
  secondary: 'red',
  darkText: 'black',
  lightText: 'grey',
  background: 'white',
  lightBackground: '#ccc',
  underlay: '#00000040',
  success: 'green',
};

/**
 * Dark Colors
 */
export const darkColors: BaseColors = {
  primary: 'blue',
  secondary: 'red',
  darkText: 'white',
  lightText: '#ccc',
  background: '#1D1D1D',
  lightBackground: '#808080',
  underlay: '#ffffff40',
  success: 'green',
};

/**
 * useColors hook is provided as the preferred way of accessing the user's preferred colors (aka Dark/Light Colors).
 */
export const useColors = () => {
  const theme = useColorScheme();
  const colors = useContext(ThemeContext);
  return theme === 'dark' ? colors.dark : colors.light;
};
