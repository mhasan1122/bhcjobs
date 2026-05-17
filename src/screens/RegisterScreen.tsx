import React, { useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useSuccessPopup } from '../context/SuccessPopupContext';
import { registerJobSeeker } from '../api/services';
import { ApiError } from '../api/client';
import { validateRegisterForm } from '../utils/validation';
import type { FieldErrors, RegisterPayload } from '../types/api';
import type { RootStackScreenProps } from '../types/navigation';
import AuthScreenLayout from '../components/AuthScreenLayout';
import TextInputField from '../components/TextInputField';
import DateOfBirthField from '../components/DateOfBirthField';
import GenderSelector from '../components/GenderSelector';
import PrimaryButton from '../components/PrimaryButton';
import { spacing, typography } from '../constants/theme';

const INITIAL_FORM: RegisterPayload = {
  name: '',
  phone: '',
  email: '',
  password: '',
  confirm_password: '',
  passport_number: '',
  dob: '',
  gender: '',
};

export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {
  const { colors, isDark } = useTheme();
  const { showSuccess } = useSuccessPopup();
  const [form, setForm] = useState<RegisterPayload>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const updateField = (key: keyof RegisterPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleRegister = async () => {
    const validationErrors = validateRegisterForm(form);
    if (Object.keys(validationErrors).length) {
      console.log('[Register] Validation failed:', validationErrors);
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const response = await registerJobSeeker(form);
      const otp = response?.data?.otp;
      const phone = form.phone.trim();
      showSuccess({
        title: 'Registration Successful',
        message: 'Your account was created. Please verify your phone with the OTP.',
        onClose: () =>
          navigation.navigate('VerifyOtp', {
            phone,
            otpHint: otp !== undefined ? String(otp) : undefined,
          }),
      });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error('[Register] API error:', {
          message: err.message,
          status: err.status,
          fieldErrors: err.errors,
        });
        if (err.errors) {
          setErrors(err.errors);
        } else {
          Alert.alert('Registration Failed', err.message);
        }
      } else {
        console.error('[Register] Unexpected error:', err);
        Alert.alert(
          'Registration Failed',
          err instanceof Error ? err.message : 'Unable to register',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <Animated.View entering={FadeIn.delay(200)} style={styles.footer}>
      <Text style={[styles.footerText, { color: colors.textSecondary }]}>
        Already have an account?{' '}
      </Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.link, { color: colors.primary }]}>Login</Text>
      </Pressable>
    </Animated.View>
  );

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AuthScreenLayout
        title="Create Account"
        subtitle="Register as a job seeker to apply for Saudi jobs"
        footer={footer}
      >
        <TextInputField
          label="Full Name"
          required
          value={form.name}
          onChangeText={(v) => updateField('name', v)}
          placeholder="Your full name"
          autoCapitalize="words"
          autoFillType="name"
          error={errors.name}
        />
        <TextInputField
          label="Phone Number"
          required
          value={form.phone}
          onChangeText={(v) => updateField('phone', v)}
          placeholder="01XXXXXXXXX"
          keyboardType="phone-pad"
          autoFillType="phone"
          error={errors.phone}
        />
        <TextInputField
          label="Email"
          required
          value={form.email}
          onChangeText={(v) => updateField('email', v)}
          placeholder="you@email.com"
          keyboardType="email-address"
          autoFillType="email"
          error={errors.email}
        />
        <TextInputField
          label="Passport Number"
          required
          value={form.passport_number}
          onChangeText={(v) => updateField('passport_number', v.toUpperCase())}
          placeholder="A12345678"
          autoCapitalize="characters"
          error={errors.passport_number}
        />
        <DateOfBirthField
          value={form.dob}
          onChange={(v) => updateField('dob', v)}
          error={errors.dob}
        />
        <GenderSelector
          value={form.gender}
          onChange={(v) => updateField('gender', v)}
          error={errors.gender}
        />
        <TextInputField
          label="Password"
          required
          value={form.password}
          onChangeText={(v) => updateField('password', v)}
          placeholder="Min. 8 characters"
          secureTextEntry
          autoFillType={Platform.OS === 'ios' ? 'password' : 'newPassword'}
          error={errors.password}
        />
        <TextInputField
          label="Confirm Password"
          required
          value={form.confirm_password}
          onChangeText={(v) => updateField('confirm_password', v)}
          placeholder="Re-enter password"
          secureTextEntry
          autoFillType="confirmPassword"
          error={errors.confirm_password}
        />
        <PrimaryButton
          title="Register"
          onPress={() => void handleRegister()}
          loading={loading}
        />
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={[styles.link, { color: colors.textSecondary }]}>← Back to Home</Text>
        </Pressable>
      </AuthScreenLayout>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    ...typography.body,
  },
  link: {
    ...typography.body,
    fontWeight: '600',
  },
  back: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
});
