import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { radius, spacing, typography } from '../constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'light' | 'inverse';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
}

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'solid',
  style,
}: PrimaryButtonProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';
  const isLight = variant === 'light';
  const isInverse = variant === 'inverse';

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled || loading}
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={[
        styles.button,
        {
          backgroundColor: isInverse
            ? '#FFFFFF'
            : isOutline || isGhost || isLight
              ? 'transparent'
              : colors.primary,
          borderColor: isLight ? '#FFFFFF' : isOutline ? colors.primary : 'transparent',
          opacity: disabled || loading ? 0.6 : 1,
        },
        (isOutline || isLight) && styles.outline,
        style,
        animatedStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            isInverse || isOutline || isGhost
              ? colors.primary
              : isLight
                ? '#fff'
                : '#fff'
          }
        />
      ) : (
        <Text
          style={[
            styles.label,
            {
              color: isInverse
                ? colors.primary
                : isLight
                  ? '#FFFFFF'
                  : isOutline || isGhost
                    ? colors.primary
                    : '#FFFFFF',
            },
          ]}
        >
          {title}
        </Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  outline: {
    borderWidth: 1.5,
  },
  label: {
    ...typography.label,
    fontWeight: '600',
  },
});
