import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { formatEmploymentType, formatSalary } from '../utils/validation';
import { getJobImageUrl } from '../utils/images';
import { stripHtml } from '../utils/html';
import type { RootStackScreenProps } from '../types/navigation';
import RemoteImage from '../components/RemoteImage';
import { radius, spacing, typography } from '../constants/theme';

export default function JobDetailScreen({ navigation, route }: RootStackScreenProps<'JobDetail'>) {
  const { job } = route.params;
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const imageUrl = getJobImageUrl(job);
  const description = stripHtml(job.job_desc);
  const requirements = stripHtml(job.job_requirement);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + spacing.sm,
            backgroundColor: colors.surface,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
          Job Details
        </Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.heroCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <RemoteImage uri={imageUrl} style={styles.heroImage} />
          <View style={styles.heroContent}>
            <Text style={[styles.jobTitle, { color: colors.text }]}>{job.job_title}</Text>
            <Text style={[styles.company, { color: colors.primary }]}>{job.company_name}</Text>
            <Text style={[styles.meta, { color: colors.textSecondary }]}>
              {job.industry_name}
              {job.employment_type ? ` · ${formatEmploymentType(job.employment_type)}` : ''}
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
        </View>

        <View style={styles.infoGrid}>
          {job.gender ? (
            <InfoChip label="Gender" value={job.gender} colors={colors} />
          ) : null}
          {job.experience ? (
            <InfoChip label="Experience" value={job.experience} colors={colors} />
          ) : null}
        </View>

        {description ? (
          <Section title="Job Description" body={description} colors={colors} />
        ) : null}
        {requirements ? (
          <Section title="Requirements" body={requirements} colors={colors} />
        ) : null}
      </ScrollView>
    </View>
  );
}

function InfoChip({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: { surface: string; border: string; text: string; textSecondary: string };
}) {
  return (
    <View style={[styles.chip, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.chipLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.chipValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

function Section({
  title,
  body,
  colors,
}: {
  title: string;
  body: string;
  colors: { surface: string; border: string; text: string; textSecondary: string };
}) {
  return (
    <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.sectionBody, { color: colors.textSecondary }]}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.h3,
    flex: 1,
    textAlign: 'center',
  },
  scroll: {
    padding: spacing.md,
    gap: spacing.md,
  },
  heroCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 160,
  },
  heroContent: {
    padding: spacing.md,
    gap: 6,
  },
  jobTitle: {
    ...typography.h2,
  },
  company: {
    ...typography.label,
    fontWeight: '600',
  },
  meta: {
    ...typography.body,
  },
  salary: {
    ...typography.h3,
    marginTop: spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    marginTop: spacing.sm,
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '600',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flex: 1,
    minWidth: '45%',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  chipLabel: {
    ...typography.caption,
    marginBottom: 4,
  },
  chipValue: {
    ...typography.label,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  section: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  sectionBody: {
    ...typography.body,
    lineHeight: 24,
  },
});
