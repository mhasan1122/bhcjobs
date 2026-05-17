import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchJobSeekerProfile } from '../api/services';
import type { AuthData } from '../types/api';
import type { AuthContextValue, AuthUser } from '../types/auth';
import { authDataToAuthUser, profileToAuthUser } from '../utils/auth';

const TOKEN_KEY = '@bhc_auth_token';
const USER_KEY = '@bhc_auth_user';

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  const loadUserProfile = useCallback(async (authToken: string, fallback?: AuthUser | null) => {
    try {
      const profile = await fetchJobSeekerProfile(authToken);
      const nextUser = profileToAuthUser(profile);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
      return nextUser;
    } catch {
      if (fallback) setUser(fallback);
      return fallback ?? null;
    }
  }, []);

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(TOKEN_KEY), AsyncStorage.getItem(USER_KEY)])
      .then(async ([storedToken, storedUser]) => {
        let cachedUser: AuthUser | null = null;
        if (storedUser) {
          try {
            cachedUser = JSON.parse(storedUser) as AuthUser;
          } catch {
            cachedUser = null;
          }
        }

        if (!storedToken) return;

        setToken(storedToken);
        if (cachedUser) setUser(cachedUser);
        await loadUserProfile(storedToken, cachedUser);
      })
      .finally(() => setReady(true));
  }, [loadUserProfile]);

  const signIn = useCallback(
    async (authData: AuthData, fallback?: Partial<AuthUser>) => {
      const nextToken = authData.token;
      const initialUser = authDataToAuthUser(authData, fallback);
      await AsyncStorage.setItem(TOKEN_KEY, nextToken);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(initialUser));
      setToken(nextToken);
      setUser(initialUser);
      await loadUserProfile(nextToken, initialUser);
    },
    [loadUserProfile],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      ready,
      signIn,
      signOut,
    }),
    [token, user, ready, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
