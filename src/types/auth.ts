import type { AuthData } from './api';

export interface AuthUser {
  user_id?: number;
  phone?: string;
  email?: string;
  name?: string;
}

export interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  ready: boolean;
  signIn: (authData: AuthData, fallback?: Partial<AuthUser>) => Promise<void>;
  signOut: () => Promise<void>;
}
