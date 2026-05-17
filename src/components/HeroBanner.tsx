import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { radius, spacing, typography } from '../constants/theme';
import PrimaryButton from './PrimaryButton';

interface HeroBannerProps {
  isAuthenticated?: boolean;
  userName?: string;
  onLogin?: () => void;
  onRegister?: () => void;
}

export default function HeroBanner({
  isAuthenticated,
  userName,
  onLogin,
  onRegister,
}: HeroBannerProps) {
  const { colors } = useTheme();
  const firstName = userName?.trim().split(/\s+/)[0];

  return (
    <Animated.View entering={FadeInDown.duration(500)} style={styles.wrapper}>
      <LinearGradient
        colors={colors.heroGradient as [string, string]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      >
        {isAuthenticated ? (
          <>
            <Text style={styles.title}>
              {firstName ? `Welcome back, ${firstName}!` : 'Welcome back!'}
            </Text>
            <Text style={styles.subtitle}>
              Browse industries, recommended jobs, and top companies tailored for you.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>#1 Platform for Saudi Jobs</Text>
            <Text style={styles.subtitle}>
              Apply for jobs in Saudi Arabia with verified employers. We connect Bangladeshi
              workforce with high-demand Saudi Jobs.
            </Text>
            {onRegister && onLogin ? (
              <View style={styles.actions}>
                <PrimaryButton
                  title="Get Started"
                  onPress={onRegister}
                  variant="inverse"
                  style={styles.btn}
                />
                <PrimaryButton title="Login" onPress={onLogin} variant="light" style={styles.btn} />
              </View>
            ) : null}
          </>
        )}
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  gradient: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  actions: {
    gap: spacing.sm,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  btn: {
    width: '100%',
  },
});
