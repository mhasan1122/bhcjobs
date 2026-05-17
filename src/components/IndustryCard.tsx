import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { getIndustryImageUrl } from '../utils/images';
import type { Industry } from '../types/api';
import { radius, spacing, typography } from '../constants/theme';
import RemoteImage from './RemoteImage';

interface IndustryCardProps {
  industry: Industry;
  index?: number;
}

export default function IndustryCard({ industry, index = 0 }: IndustryCardProps) {
  const { colors } = useTheme();
  const imageUrl = getIndustryImageUrl(industry.image);

  return (
    <Animated.View entering={FadeInRight.delay(index * 60).springify()}>
      <Pressable
        style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <RemoteImage uri={imageUrl} style={styles.image} />
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
          {industry.name}
        </Text>
        <Text style={[styles.count, { color: colors.textSecondary }]}>
          {industry.jobs_count ?? 0} jobs
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    marginRight: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
    paddingBottom: spacing.sm,
  },
  image: {
    width: '100%',
    height: 80,
  },
  name: {
    ...typography.caption,
    fontWeight: '600',
    paddingHorizontal: spacing.sm,
    marginTop: spacing.sm,
  },
  count: {
    ...typography.caption,
    paddingHorizontal: spacing.sm,
    marginTop: 2,
  },
});
