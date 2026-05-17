import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { formatEmploymentType, formatSalary } from '../utils/validation';
import { getJobImageUrl } from '../utils/images';
import type { Job } from '../types/api';
import { radius, spacing, typography } from '../constants/theme';
import RemoteImage from './RemoteImage';

interface JobCardProps {
  job: Job;
  index?: number;
  onPress?: () => void;
}

export default function JobCard({ job, index = 0, onPress }: JobCardProps) {
  const { colors } = useTheme();
  const imageUrl = getJobImageUrl(job);

  return (
    <Animated.View entering={FadeInUp.delay(index * 80).springify()}>
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
          pressed && onPress && styles.pressed,
        ]}
      >
        <RemoteImage uri={imageUrl} style={styles.image} />
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {job.job_title}
          </Text>
          <Text style={[styles.company, { color: colors.primary }]} numberOfLines={1}>
            {job.company_name}
          </Text>
          <Text style={[styles.meta, { color: colors.textSecondary }]} numberOfLines={1}>
            {job.industry_name} · {formatEmploymentType(job.employment_type)}
          </Text>
          <Text style={[styles.salary, { color: colors.text }]}>{formatSalary(job)}</Text>
          {job.vacancy ? (
            <View style={[styles.badge, { backgroundColor: colors.background }]}>
              <Text style={[styles.badgeText, { color: colors.primary }]}>
                {job.vacancy} vacancies
              </Text>
            </View>
          ) : null}
        </View>
        {onPress ? (
          <View style={styles.chevron}>
            <Text style={{ color: colors.textSecondary }}>›</Text>
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.92,
  },
  chevron: {
    justifyContent: 'center',
    paddingRight: spacing.sm,
  },
  image: {
    width: 88,
    height: 120,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    gap: 4,
  },
  title: {
    ...typography.label,
    fontWeight: '700',
  },
  company: {
    ...typography.caption,
    fontWeight: '600',
  },
  meta: {
    ...typography.caption,
  },
  salary: {
    ...typography.caption,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    marginTop: spacing.xs,
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '600',
  },
});
