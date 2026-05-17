import type { lightColors } from '../constants/theme';

export type ThemeColors = typeof lightColors;
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  ready: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}
