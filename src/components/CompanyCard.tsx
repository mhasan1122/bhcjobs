import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { getCompanyImageUrl } from '../utils/images';
import type { Company } from '../types/api';
import { radius, spacing, typography } from '../constants/theme';
import RemoteImage from './RemoteImage';

interface CompanyCardProps {
  company: Company;
  index?: number;
}

export default function CompanyCard({ company, index = 0 }: CompanyCardProps) {
  const { colors } = useTheme();
  const imageUrl = getCompanyImageUrl(company.image);

  return (
    <Animated.View entering={FadeInRight.delay(index * 60).springify()}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <RemoteImage uri={imageUrl} style={styles.logo} contentFit="contain" />
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
          {company.name}
        </Text>
        <Text style={[styles.jobs, { color: colors.textSecondary }]}>
          {company.jobs_count ?? 0} open jobs
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: radius.sm,
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.label,
    fontWeight: '600',
    textAlign: 'center',
  },
  jobs: {
    ...typography.caption,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
