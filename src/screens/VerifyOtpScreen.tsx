import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useSuccessPopup } from '../context/SuccessPopupContext';
import { verifyPhoneOtp } from '../api/services';
import { ApiError } from '../api/client';
import { validateOtpForm } from '../utils/validation';
import type { FieldErrors } from '../types/api';
import type { RootStackScreenProps } from '../types/navigation';
import AuthScreenLayout from '../components/AuthScreenLayout';
import TextInputField from '../components/TextInputField';
import PrimaryButton from '../components/PrimaryButton';
import { radius, spacing, typography } from '../constants/theme';

export default function VerifyOtpScreen({
  navigation,
  route,
}: RootStackScreenProps<'VerifyOtp'>) {
  const { phone: initialPhone, otpHint } = route.params ?? {};
  const { colors, isDark } = useTheme();
  const { signIn } = useAuth();
  const { showSuccess } = useSuccessPopup();
  const [phone, setPhone] = useState(initialPhone ?? '');
  const [otp, setOtp] = useState(otpHint ?? '');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    const validationErrors = validateOtpForm({ phone, otp });
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const data = await verifyPhoneOtp(phone, otp);
      await signIn({ ...data, phone: phone.trim() }, { phone: phone.trim() });
      showSuccess({
        title: 'Verified!',
        message: 'Your phone has been verified successfully.',
        onClose: () => navigation.popToTop(),
      });
    } catch (err) {
      if (err instanceof ApiError && err.errors) {
        setErrors(err.errors);
      } else {
        Alert.alert(
          'Verification Failed',
          err instanceof Error ? err.message : 'Invalid OTP',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AuthScreenLayout
        title="Verify Phone"
        subtitle="Enter the OTP sent to your phone number"
      >
        {otpHint ? (
          <View
            style={[
              styles.hintBox,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.hintLabel, { color: colors.textSecondary }]}>
              Dev OTP (from register response):
            </Text>
            <Text style={[styles.hintOtp, { color: colors.primary }]}>{otpHint}</Text>
          </View>
        ) : null}
        <TextInputField
          label="Phone Number"
          required
          value={phone}
          onChangeText={setPhone}
          placeholder="01XXXXXXXXX"
          keyboardType="phone-pad"
          autoFillType="phone"
          error={errors.phone}
          editable={!initialPhone}
        />
        <TextInputField
          label="OTP Code"
          required
          value={otp}
          onChangeText={setOtp}
          placeholder="Enter 4–6 digit OTP"
          keyboardType="number-pad"
          autoFillType="otp"
          error={errors.otp}
        />
        <PrimaryButton title="Verify OTP" onPress={() => void handleVerify()} loading={loading} />
        <Pressable onPress={() => navigation.navigate('Login')} style={styles.back}>
          <Text style={[styles.link, { color: colors.primary }]}>Go to Login</Text>
        </Pressable>
      </AuthScreenLayout>
    </>
  );
}

const styles = StyleSheet.create({
  hintBox: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  hintLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  hintOtp: {
    ...typography.h2,
    letterSpacing: 4,
  },
  back: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  link: {
    ...typography.body,
    fontWeight: '600',
  },
});
