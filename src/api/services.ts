import { apiRequest } from './client';
import type {
  ApiResponse,
  AuthData,
  Company,
  Industry,
  Job,
  JobSeekerProfile,
  RegisterPayload,
  RegisterResponseData,
} from '../types/api';

export async function fetchIndustries(): Promise<Industry[]> {
  const res = await apiRequest<Industry[]>('/api/industry/get');
  return res.data ?? [];
}

export async function fetchJobs(): Promise<Job[]> {
  const res = await apiRequest<Job[]>('/api/job/get');
  return res.data ?? [];
}

export async function fetchCompanies(): Promise<Company[]> {
  const res = await apiRequest<Company[]>('/api/company/get');
  return res.data ?? [];
}

export async function loginJobSeeker(phone: string, password: string): Promise<AuthData> {
  const res = await apiRequest<AuthData>('/api/job_seeker/login', {
    method: 'POST',
    body: { phone: phone.trim(), password },
  });
  return res.data;
}

export async function registerJobSeeker(
  payload: RegisterPayload,
): Promise<ApiResponse<RegisterResponseData>> {
  return apiRequest<RegisterResponseData>('/api/job_seeker/register', {
    method: 'POST',
    body: {
      ...payload,
      phone: payload.phone.trim(),
      email: payload.email.trim(),
      name: payload.name.trim(),
      passport_number: payload.passport_number.trim().toUpperCase(),
      dob: payload.dob.trim(),
    },
  });
}

export async function verifyPhoneOtp(phone: string, otp: string): Promise<AuthData> {
  const res = await apiRequest<AuthData>('/api/job_seeker/phone_verify', {
    method: 'POST',
    body: { phone: phone.trim(), otp: otp.trim() },
  });
  return res.data;
}

export async function fetchJobSeekerProfile(token: string): Promise<JobSeekerProfile> {
  const res = await apiRequest<JobSeekerProfile>('/api/job_seeker/get', { token });
  return res.data;
}
