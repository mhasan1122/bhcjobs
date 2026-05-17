import type { TextStyle } from 'react-native';

/** BHC Jobs brand — light blue & white */
export const lightColors = {
  primary: '#1D72E8',
  primaryDark: '#1558B8',
  primaryLight: '#60A5FA',
  background: '#F0F7FF',
  surface: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#5B6B7C',
  border: '#D6E6F7',
  error: '#DC2626',
  success: '#16A34A',
  heroGradient: ['#1A5FA8', '#38BDF8'],
  cardShadow: '#0F172A',
};

export const darkColors = {
  primary: '#60A5FA',
  primaryDark: '#3B82F6',
  primaryLight: '#93C5FD',
  background: '#0B1220',
  surface: '#151F2E',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  border: '#243044',
  error: '#F87171',
  success: '#4ADE80',
  heroGradient: ['#0F2847', '#1D4ED8'],
  cardShadow: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const typography: Record<string, TextStyle> = {
  h1: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '700', lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
  label: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
};
