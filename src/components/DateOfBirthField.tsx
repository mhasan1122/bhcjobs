import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';
import FieldLabel from './FieldLabel';
import { radius, spacing, typography } from '../constants/theme';
import {
  formatDateForDisplay,
  formatDateToISO,
  getDefaultBirthDate,
  MAX_BIRTH_DATE,
  MIN_BIRTH_DATE,
  parseISODate,
} from '../utils/date';

interface DateOfBirthFieldProps {
  label?: string;
  value: string;
  onChange: (isoDate: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export default function DateOfBirthField({
  label = 'Date of Birth',
  value,
  onChange,
  error,
  placeholder = 'Select date of birth',
  required = true,
}: DateOfBirthFieldProps) {
  const { colors, isDark } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(
    () => parseISODate(value) ?? getDefaultBirthDate(),
  );

  const openPicker = () => {
    setTempDate(parseISODate(value) ?? getDefaultBirthDate());
    setShowPicker(true);
  };

  const applyDate = (date: Date) => {
    onChange(formatDateToISO(date));
    setShowPicker(false);
  };

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (event.type === 'set' && selectedDate) {
        onChange(formatDateToISO(selectedDate));
      }
      return;
    }
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const displayValue = value ? formatDateForDisplay(value) : '';

  return (
    <View style={styles.wrapper}>
      {label ? <FieldLabel label={label} required={required} /> : null}

      <Pressable
        onPress={openPicker}
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.error : colors.border,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <Text
          style={[
            styles.valueText,
            { color: displayValue ? colors.text : colors.textSecondary },
          ]}
        >
          {displayValue ? displayValue : placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={22} color={colors.primary} />
      </Pressable>

      {error ? <Text style={[styles.error, { color: colors.error }]}>{error}</Text> : null}

      {Platform.OS === 'android' && showPicker ? (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={handleChange}
          minimumDate={MIN_BIRTH_DATE}
          maximumDate={MAX_BIRTH_DATE}
        />
      ) : null}

      {Platform.OS === 'ios' ? (
        <Modal visible={showPicker} transparent animationType="slide" onRequestClose={() => setShowPicker(false)}>
          <Pressable style={styles.modalOverlay} onPress={() => setShowPicker(false)}>
            <Pressable
              style={[styles.modalSheet, { backgroundColor: colors.surface }]}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
                <Pressable onPress={() => setShowPicker(false)} hitSlop={12}>
                  <Text style={[styles.modalAction, { color: colors.textSecondary }]}>Cancel</Text>
                </Pressable>
                <Text style={[styles.modalTitle, { color: colors.text }]}>{label}</Text>
                <Pressable onPress={() => applyDate(tempDate)} hitSlop={12}>
                  <Text style={[styles.modalAction, styles.modalDone, { color: colors.primary }]}>
                    Done
                  </Text>
                </Pressable>
              </View>

              <DateTimePicker
                value={tempDate}
                mode="date"
                display="inline"
                onChange={handleChange}
                minimumDate={MIN_BIRTH_DATE}
                maximumDate={MAX_BIRTH_DATE}
                themeVariant={isDark ? 'dark' : 'light'}
                style={styles.iosPicker}
              />
            </Pressable>
          </Pressable>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  valueText: {
    ...typography.body,
    flex: 1,
  },
  error: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalSheet: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingBottom: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalTitle: {
    ...typography.label,
    fontWeight: '600',
  },
  modalAction: {
    ...typography.body,
    minWidth: 56,
  },
  modalDone: {
    textAlign: 'right',
    fontWeight: '700',
  },
  iosPicker: {
    alignSelf: 'center',
  },
});
