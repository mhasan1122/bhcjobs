import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { radius, spacing, typography } from '../constants/theme';
import FieldLabel from './FieldLabel';

const OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
] as const;

interface GenderSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export default function GenderSelector({
  value,
  onChange,
  error,
  required = true,
}: GenderSelectorProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <FieldLabel label="Gender" required={required} />
      <View style={styles.row}>
        {OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={[
                styles.option,
                {
                  backgroundColor: selected ? colors.primary : colors.surface,
                  borderColor: error ? colors.error : selected ? colors.primary : colors.border,
                },
              ]}
            >
              <Text style={[styles.optionText, { color: selected ? '#FFFFFF' : colors.text }]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={[styles.error, { color: colors.error }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  optionText: {
    ...typography.label,
    fontWeight: '600',
  },
  error: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
});
