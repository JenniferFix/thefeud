'use client';
import useSupabase from '@/hooks/useSupabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteGameInstance,
  getGameInstance,
  createGameInstance,
} from '@/queries/instancequeries';

export function useCreateGameInstance() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async ({ gameId }: { gameId: string }) => {
    return createGameInstance(client, gameId).then((result) => result?.data);
  };
  const onSuccess = async () => {
    //
  };
  return useMutation({ mutationFn, onSuccess });
}

export function useGetGameInstance() {
  const client = useSupabase();
}

export function useDeleteGameInstance() {
  const client = useSupabase();
  const queryClient = useQueryClient();
}
