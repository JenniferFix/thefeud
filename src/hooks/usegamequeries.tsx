'use client';
import useSupabase from '@/hooks/useSupabase';
import { useQuery } from '@tanstack/react-query';
import { getGames, getGameQuestions } from '@/queries/gamequeries';

export function useGetGames() {
  const client = useSupabase();
  const queryKey = ['games'];
  const queryFn = async () => {
    return getGames(client).then((result) => result?.data);
  };
  return useQuery({ queryKey, queryFn });
}

export function useGetGameQuestions(gameId: string) {
  const client = useSupabase();
  const queryKey = ['game', gameId];
  const queryFn = async () => {
    return getGameQuestions(client, gameId).then((result) => result?.data);
  };
  return useQuery({ queryKey, queryFn });
}
