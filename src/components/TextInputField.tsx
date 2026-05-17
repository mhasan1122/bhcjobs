import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { radius, spacing, typography } from '../constants/theme';
import FieldLabel from './FieldLabel';

export type AutoFillType =
  | 'default'
  | 'name'
  | 'phone'
  | 'email'
  | 'password'
  | 'newPassword'
  | 'confirmPassword'
  | 'otp';

function getAutoFillConfig(type: AutoFillType): {
  textContentType: TextInputProps['textContentType'];
  autoComplete: TextInputProps['autoComplete'];
} {
  switch (type) {
    case 'name':
      return { textContentType: 'name', autoComplete: 'name' };
    case 'phone':
      return { textContentType: 'telephoneNumber', autoComplete: 'tel' };
    case 'email':
      return { textContentType: 'emailAddress', autoComplete: 'email' };
    case 'password':
      return { textContentType: 'password', autoComplete: 'password' };
    case 'newPassword':
      return { textContentType: 'newPassword', autoComplete: 'password-new' };
    case 'confirmPassword':
      return {
        textContentType: Platform.OS === 'ios' ? 'oneTimeCode' : 'password',
        autoComplete: 'off',
      };
    case 'otp':
      return { textContentType: 'oneTimeCode', autoComplete: 'sms-otp' };
    default:
      return { textContentType: 'none', autoComplete: 'off' };
  }
}

interface TextInputFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  multiline?: boolean;
  editable?: boolean;
  autoFillType?: AutoFillType;
  required?: boolean;
}

export default function TextInputField({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
  multiline = false,
  editable = true,
  autoFillType = 'default',
  required = false,
}: TextInputFieldProps) {
  const { colors } = useTheme();
  const fill = getAutoFillConfig(autoFillType);

  return (
    <View style={styles.wrapper}>
      {label ? <FieldLabel label={label} required={required} /> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        editable={editable}
        autoCorrect={false}
        spellCheck={false}
        textContentType={fill.textContentType}
        autoComplete={fill.autoComplete}
        importantForAutofill={autoFillType === 'confirmPassword' ? 'no' : 'yes'}
        passwordRules={autoFillType === 'newPassword' ? 'minlength: 8;' : undefined}
        style={[
          styles.input,
          multiline && styles.multiline,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.error : colors.border,
            color: colors.text,
          },
        ]}
      />
      {error ? <Text style={[styles.error, { color: colors.error }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  input: {
    ...typography.body,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    minHeight: 48,
  },
  multiline: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  error: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
});
