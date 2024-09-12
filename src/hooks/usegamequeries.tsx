'use client';
import useSupabase from '@/hooks/useSupabase';
import { useQuery } from '@tanstack/react-query';
import { getAllGames } from '@/queries/gamequeries';

export function useGetUsersGames() {
  const client = useSupabase();
  const queryKey = ['games'];

  const queryFn = async () => {
    return getAllGames(client).then((result) => result?.data);
  };

  return useQuery({ queryKey, queryFn });
}
