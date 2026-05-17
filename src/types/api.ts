export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface Industry {
  id: number;
  priority?: number;
  name: string;
  is_active: number;
  image: string;
  jobs_count: number;
}

export interface CompanySummary {
  id: number;
  name: string;
  slug?: string;
  image?: string;
}

export interface Job {
  id: number;
  company_id: number;
  job_title: string;
  company_name: string;
  industry_name: string;
  is_active: number;
  currency?: string;
  min_salary?: number;
  max_salary?: number;
  employment_type?: string;
  vacancy?: number;
  is_trending?: number | boolean;
  view_count?: number;
  image?: string;
  company?: CompanySummary;
  gender?: string;
  experience?: string;
  job_desc?: string;
  job_requirement?: string;
  address?: string | null;
}

export interface Company {
  id: number;
  name: string;
  is_active: number;
  slug?: string;
  image: string;
  jobs_count: number;
}

export interface AuthData {
  token: string;
  user_id?: number;
  phone?: string;
  email?: string;
  name?: string;
}

export interface JobSeekerProfile {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirm_password: string;
  passport_number: string;
  dob: string;
  gender: string;
}

export interface RegisterResponseData {
  id: number;
  email: string;
  phone: string;
  otp?: number;
}

export type FieldErrors = Record<string, string>;
