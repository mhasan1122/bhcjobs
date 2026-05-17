import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface BrandLogoProps {
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  width?: number;
  height?: number;
}

/** Width of the hexagon icon in the logo asset (crop before the "B" text). */
const ICON_CLIP_WIDTH = 30;

export default function BrandLogo({
  style,
  imageStyle,
  width = 120,
  height = 40,
}: BrandLogoProps) {
  const { isDark, colors } = useTheme();

  if (isDark) {
    return (
      <View style={[styles.row, { height }, style]} accessibilityLabel="BHC Jobs">
        <View
          style={[
            styles.iconClip,
            {
              width: ICON_CLIP_WIDTH,
              height,
              backgroundColor: colors.background,
            },
          ]}
        >
          <Image
            source={require('../../assets/logo_day_mode.png')}
            style={[styles.iconImage, { width, height }]}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.logoText}>BHCJOBS</Text>
      </View>
    );
  }

  return (
    <Image
      source={require('../../assets/logo_day_mode.png')}
      style={[{ width, height }, imageStyle]}
      resizeMode="contain"
      accessibilityLabel="BHC Jobs"
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconClip: {
    overflow: 'hidden',
  },
  iconImage: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.8,
    includeFontPadding: false,
  },
});
