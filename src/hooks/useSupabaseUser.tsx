import React from 'react';
import useSupabase from './useSupabase';
import { Session, User } from '@supabase/supabase-js';

export const useSupabaseUser = () => {
  // const [session, setSession] = React.useState<Session | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const supabase = useSupabase();

  React.useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return { user };
  //   React.useEffect(() => {
  //     supabase.auth.getSession().then(({ data: { session } }) => {
  //       setSession(session);
  //     });
  //
  //     const {
  //       data: { subscription },
  //     } = supabase.auth.onAuthStateChange((_event, session) => {
  //       setSession(session);
  //     });
  //     return () => subscription.unsubscribe();
  //   }, []);
  // };
  //
  // export const useSupabaseUser = () => {
  //   return React.useMemo(_useSupabaseUser, []);
};
