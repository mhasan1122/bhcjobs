import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { radius, spacing, typography } from '../constants/theme';

function getInitials(name?: string): string {
  if (!name?.trim()) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}

export default function UserProfileMenu() {
  const { colors } = useTheme();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const initials = getInitials(user?.name);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.profileBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        accessibilityLabel="Open profile"
      >
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {user?.name?.split(' ')[0] || 'Profile'}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable
            style={[styles.sheet, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.sheetHeader}>
              <View style={[styles.avatarLarge, { backgroundColor: colors.primary }]}>
                <Text style={styles.avatarTextLarge}>{initials}</Text>
              </View>
              <Text style={[styles.fullName, { color: colors.text }]}>{user?.name || 'User'}</Text>
              {user?.phone ? (
                <Text style={[styles.meta, { color: colors.textSecondary }]}>{user.phone}</Text>
              ) : null}
              {user?.email ? (
                <Text style={[styles.meta, { color: colors.textSecondary }]}>{user.email}</Text>
              ) : null}
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <Pressable
              onPress={() => {
                setOpen(false);
                void signOut();
              }}
              style={({ pressed }) => [
                styles.signOutRow,
                { borderColor: colors.border, backgroundColor: pressed ? colors.background : colors.surface },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Sign out"
            >
              <Ionicons name="log-out-outline" size={22} color={colors.error} style={styles.signOutIcon} />
              <Text style={[styles.signOutText, { color: colors.text }]} numberOfLines={1}>
                Sign Out
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    paddingRight: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    maxWidth: 140,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  name: {
    ...typography.caption,
    fontWeight: '600',
    flexShrink: 1,
    marginLeft: 6,
    marginRight: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: spacing.md,
  },
  sheet: {
    width: 280,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  sheetHeader: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarTextLarge: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  fullName: {
    ...typography.h3,
    textAlign: 'center',
  },
  meta: {
    ...typography.caption,
    marginTop: 4,
    textAlign: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: spacing.md,
  },
  signOutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    minHeight: 48,
  },
  signOutIcon: {
    marginRight: spacing.sm,
  },
  signOutText: {
    ...typography.label,
    fontWeight: '600',
    flexShrink: 0,
  },
});
