import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../constants/theme';
import BrandLogo from './BrandLogo';
import HeaderActions from './HeaderActions';

interface AppHeaderProps {
  onLoginPress?: () => void;
}

export default function AppHeader({ onLoginPress }: AppHeaderProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.sm,
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <BrandLogo />
      <HeaderActions onLoginPress={onLoginPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
