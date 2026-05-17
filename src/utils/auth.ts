import type { AuthData, JobSeekerProfile } from '../types/api';
import type { AuthUser } from '../types/auth';

export function profileToAuthUser(profile: JobSeekerProfile): AuthUser {
  return {
    user_id: profile.id,
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  };
}

export function authDataToAuthUser(authData: AuthData, fallback?: Partial<AuthUser>): AuthUser {
  return {
    user_id: authData.user_id ?? fallback?.user_id,
    phone: authData.phone ?? fallback?.phone,
    email: authData.email ?? fallback?.email,
    name: authData.name ?? fallback?.name,
  };
}
