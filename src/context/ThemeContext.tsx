import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from '../constants/theme';
import type { ThemeContextValue, ThemeMode } from '../types/theme';

const STORAGE_KEY = '@bhc_theme_mode';

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setMode(stored);
        }
      })
      .finally(() => setReady(true));
  }, []);

  const isDark = mode === 'dark' || (mode === 'system' && systemScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const resolved =
        prev === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : prev;
      const next: ThemeMode = resolved === 'dark' ? 'light' : 'dark';
      void AsyncStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, [systemScheme]);

  const setThemeMode = useCallback((next: ThemeMode) => {
    setMode(next);
    void AsyncStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark,
      colors,
      ready,
      toggleTheme,
      setThemeMode,
    }),
    [mode, isDark, colors, ready, toggleTheme, setThemeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
