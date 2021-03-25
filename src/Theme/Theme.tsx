import React, { createContext } from 'react';
import type { FC } from 'react';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import { BaseColors, darkColors, lightColors } from '../Colors';

/**
 * ThemeProps
 */
export interface ThemeProps {
  dark: BaseColors;
  light: BaseColors;
}

export const defaultTheme: ThemeProps = {
  dark: darkColors,
  light: lightColors,
};

export const ThemeContext = createContext<ThemeProps>(defaultTheme);

/**
 * Temporarily require a Provider since the upstream implementation uses root view customizations to accomplish this same behavior
 */
export const ThemeProvider: FC<{ theme?: ThemeProps }> = ({
  children,
  theme,
}) => {
  return (
    <AppearanceProvider>
      <ThemeContext.Provider value={theme || defaultTheme}>
        {children}
      </ThemeContext.Provider>
    </AppearanceProvider>
  );
};

/**
 * Note: Although appearance is available immediately, it may change (e.g
 * Dark Mode) so any rendering logic or styles that depend on this should try
 * to call this function on every render, rather than caching the value (for
 * example, using inline styles rather than setting a value in a
 * `StyleSheet`).
 *
 * Example: `const colorScheme = Appearance.get('colorScheme');`
 *
 * @param {string} preference Name of preference (e.g. 'colorScheme').
 * @returns {ColorSchemeName} Value for the preference.
 */
export const getTheme = Appearance.getColorScheme;
