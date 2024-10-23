import React from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import useSupabase from '@/hooks/useSupabase';

export interface AuthContext {
  isAuthenticated: boolean;
  session: Session | null;
  user: User | null;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isLoginError: boolean;
  isLogoutError: boolean;
  error: Error | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export const SupabaseAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const supabase = useSupabase();
  const [session, setSession] = React.useState<Session | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState<boolean>(false);
  const [isLoginError, setIsLoginError] = React.useState<boolean>(false);
  const [isLogoutError, setIsLogoutError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<AuthError | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    setIsAuthenticated(Boolean(session));
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [session]);

  const login = React.useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setIsLoggingIn(true);
      setIsLoginError(false);
      setError(null);
      supabase.auth
        .signInWithPassword({ email: email, password: password })
        .then(({ data, error }) => {
          if (!error) {
            setSession(data.session);
            setUser(data.user);
            setIsLoggingIn(false);
          } else {
            setError(error);
            setIsLoginError(true);
            setIsLoggingIn(false);
          }
        });
    },
    [],
  );

  const logout = React.useCallback(async () => {
    setIsLoggingOut(true);
    setIsLogoutError(false);
    setError(null);
    supabase.auth.signOut().then(({ error }) => {
      if (!error) {
        setSession(null);
        setIsLoggingOut(false);
      } else {
        setError(error);
        setIsLogoutError(true);
        setIsLoggingOut(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        session,
        user,
        login,
        logout,
        isLoggingIn,
        isLoggingOut,
        isLoginError,
        isLogoutError,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useSupabaseAuth must be used within a SupabaseAuthProvider!',
    );
  }
  return context;
};
