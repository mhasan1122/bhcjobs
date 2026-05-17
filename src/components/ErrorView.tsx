import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, typography } from '../constants/theme';
import PrimaryButton from './PrimaryButton';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorView({ message, onRetry }: ErrorViewProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
      {onRetry ? <PrimaryButton title="Try Again" onPress={onRetry} variant="outline" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
  },
  message: {
    ...typography.body,
    textAlign: 'center',
  },
});
