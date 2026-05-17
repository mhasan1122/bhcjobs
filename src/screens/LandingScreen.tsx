import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLandingData } from '../hooks/useLandingData';
import type { RootStackParamList } from '../types/navigation';
import AppHeader from '../components/AppHeader';
import HeroBanner from '../components/HeroBanner';
import SectionHeader from '../components/SectionHeader';
import IndustryCard from '../components/IndustryCard';
import JobCard from '../components/JobCard';
import CompanyCard from '../components/CompanyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorView from '../components/ErrorView';
import { spacing, typography } from '../constants/theme';

type LandingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Landing'>;
};

export default function LandingScreen({ navigation }: LandingScreenProps) {
  const { colors, isDark } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const { industries, jobs, companies, loading, error, refresh } = useLandingData();

  const goLogin = () => navigation.navigate('Login');
  const goRegister = () => navigation.navigate('Register');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AppHeader onLoginPress={isAuthenticated ? undefined : goLogin} />

      {loading && industries.length === 0 ? (
        <LoadingSpinner fullScreen />
      ) : error && industries.length === 0 ? (
        <ErrorView message={error} onRetry={() => void refresh()} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => void refresh()}
              tintColor={colors.primary}
            />
          }
        >
          <HeroBanner
            isAuthenticated={isAuthenticated}
            userName={user?.name}
            onLogin={goLogin}
            onRegister={goRegister}
          />

          <SectionHeader
            title="Popular Industries"
            subtitle="Explore top hiring sectors in Saudi Arabia"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {industries.length === 0 && !loading ? (
              <Text style={[styles.empty, { color: colors.textSecondary }]}>
                No industries available
              </Text>
            ) : (
              industries.map((item, index) => (
                <IndustryCard key={item.id} industry={item} index={index} />
              ))
            )}
          </ScrollView>

          <SectionHeader title="Recommended Jobs" subtitle="Hand-picked opportunities for you" />
          {jobs.length === 0 && !loading ? (
            <Text style={[styles.empty, { color: colors.textSecondary }]}>
              No jobs available right now
            </Text>
          ) : (
            jobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
                onPress={() => navigation.navigate('JobDetail', { job })}
              />
            ))
          )}

          <SectionHeader title="Popular Companies" subtitle="Trusted employers hiring now" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.horizontalList, styles.bottomPad]}
          >
            {companies.length === 0 && !loading ? (
              <Text style={[styles.empty, { color: colors.textSecondary }]}>
                No companies available
              </Text>
            ) : (
              companies.map((item, index) => (
                <CompanyCard key={item.id} company={item} index={index} />
              ))
            )}
          </ScrollView>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  horizontalList: {
    paddingLeft: spacing.md,
    paddingBottom: spacing.sm,
  },
  empty: {
    ...typography.body,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  bottomPad: {
    paddingBottom: spacing.xl,
  },
});
