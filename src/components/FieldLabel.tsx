import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, typography } from '../constants/theme';

interface FieldLabelProps {
  label: string;
  required?: boolean;
}

export default function FieldLabel({ label, required = false }: FieldLabelProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      {required ? <Text style={[styles.asterisk, { color: colors.error }]}> *</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.label,
  },
  asterisk: {
    ...typography.label,
    fontWeight: '700',
  },
});
