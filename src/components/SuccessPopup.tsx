import React, { useEffect } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { radius, spacing, typography } from '../constants/theme';
import PrimaryButton from './PrimaryButton';

export interface SuccessPopupProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function SuccessPopup({ visible, title, message, onClose }: SuccessPopupProps) {
  const { colors } = useTheme();
  const checkScale = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      checkScale.value = 0;
      checkScale.value = withDelay(200, withSpring(1, { damping: 12, stiffness: 180 }));
    }
  }, [visible, checkScale]);

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View
        entering={FadeIn.duration(220)}
        exiting={FadeOut.duration(180)}
        style={styles.overlay}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
        <Animated.View
          entering={ZoomIn.springify().damping(14).stiffness(200)}
          exiting={FadeOut.duration(150)}
          style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Animated.View
            style={[
              styles.iconWrap,
              { backgroundColor: `${colors.success}22` },
              checkAnimatedStyle,
            ]}
          >
            <Ionicons name="checkmark-circle" size={64} color={colors.success} />
          </Animated.View>

          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>

          <PrimaryButton title="OK" onPress={onClose} style={styles.button} />
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  button: {
    width: '100%',
  },
});
