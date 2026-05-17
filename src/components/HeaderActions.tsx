import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { radius, spacing } from '../constants/theme';
import UserProfileMenu from './UserProfileMenu';

interface HeaderActionsProps {
  onLoginPress?: () => void;
}

export default function HeaderActions({ onLoginPress }: HeaderActionsProps) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <View style={styles.row}>
      {isAuthenticated ? (
        <UserProfileMenu />
      ) : onLoginPress ? (
        <Pressable
          onPress={onLoginPress}
          style={[styles.iconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
          accessibilityLabel="Login"
        >
          <Ionicons name="person-outline" size={20} color={colors.primary} />
        </Pressable>
      ) : null}

      <Pressable
        onPress={toggleTheme}
        style={[styles.iconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        accessibilityLabel="Toggle theme"
      >
        <Ionicons
          name={isDark ? 'sunny-outline' : 'moon-outline'}
          size={20}
          color={colors.primary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
