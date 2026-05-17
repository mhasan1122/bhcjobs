import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '../api/client';
import { fetchCompanies, fetchIndustries, fetchJobs } from '../api/services';
import type { Company, Industry, Job } from '../types/api';

export function useLandingData() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [industryData, jobData, companyData] = await Promise.all([
        fetchIndustries(),
        fetchJobs(),
        fetchCompanies(),
      ]);

      const popularIndustries = [...industryData]
        .filter((i) => i.is_active)
        .sort((a, b) => (b.jobs_count ?? 0) - (a.jobs_count ?? 0))
        .slice(0, 10);

      const recommendedJobs = [...jobData]
        .filter((j) => j.is_active)
        .sort((a, b) => {
          if (Boolean(b.is_trending) !== Boolean(a.is_trending)) {
            return Number(b.is_trending) - Number(a.is_trending);
          }
          return (b.view_count ?? 0) - (a.view_count ?? 0);
        })
        .slice(0, 8);

      const popularCompanies = [...companyData]
        .filter((c) => c.is_active)
        .sort((a, b) => (b.jobs_count ?? 0) - (a.jobs_count ?? 0))
        .slice(0, 10);

      setIndustries(popularIndustries);
      setJobs(recommendedJobs);
      setCompanies(popularCompanies);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to load data';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { industries, jobs, companies, loading, error, refresh: load };
}
