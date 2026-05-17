import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useSuccessPopup } from '../context/SuccessPopupContext';
import { loginJobSeeker } from '../api/services';
import { ApiError } from '../api/client';
import { validateLoginForm } from '../utils/validation';
import type { FieldErrors } from '../types/api';
import type { RootStackScreenProps } from '../types/navigation';
import AuthScreenLayout from '../components/AuthScreenLayout';
import TextInputField from '../components/TextInputField';
import PrimaryButton from '../components/PrimaryButton';
import { spacing, typography } from '../constants/theme';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const { colors, isDark } = useTheme();
  const { signIn, isAuthenticated } = useAuth();
  const { showSuccess } = useSuccessPopup();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.popToTop();
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = async () => {
    const validationErrors = validateLoginForm({ phone, password });
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const data = await loginJobSeeker(phone, password);
      await signIn({ ...data, phone: phone.trim() }, { phone: phone.trim() });
      showSuccess({
        title: 'Login Successful',
        message: 'You have been signed in successfully.',
        onClose: () => navigation.popToTop(),
      });
    } catch (err) {
      if (err instanceof ApiError && err.errors) {
        setErrors(err.errors);
      } else {
        Alert.alert('Login Failed', err instanceof Error ? err.message : 'Unable to login');
      }
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <Animated.View entering={FadeIn.delay(200)} style={styles.footer}>
      <Text style={[styles.footerText, { color: colors.textSecondary }]}>
        Don&apos;t have an account?{' '}
      </Text>
      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.link, { color: colors.primary }]}>Register</Text>
      </Pressable>
    </Animated.View>
  );

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AuthScreenLayout
        title="Welcome Back"
        subtitle="Sign in with your phone and password"
        footer={footer}
      >
        <TextInputField
          label="Phone Number"
          required
          value={phone}
          onChangeText={setPhone}
          placeholder="01XXXXXXXXX"
          keyboardType="phone-pad"
          autoFillType="phone"
          error={errors.phone}
        />
        <TextInputField
          label="Password"
          required
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          autoFillType="password"
          error={errors.password}
        />
        <PrimaryButton title="Login" onPress={() => void handleLogin()} loading={loading} />
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
