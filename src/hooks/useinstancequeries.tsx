'use client';
import useSupabase from '@/hooks/useSupabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteGameInstance,
  getGameInstance,
  createGameInstance,
  getInstanceGame,
  getActiveInstances,
} from '@/queries/instancequeries';

export function useCreateGameInstance() {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const mutationFn = async ({ gameId }: { gameId: string }) => {
    return createGameInstance(client, gameId).then((result) => result?.data);
  };
  const onSuccess = async () => {
    queryClient.invalidateQueries({ queryKey: ['gameInstances'] }); //
  };
  return useMutation({ mutationFn, onSuccess });
}

export function useGetGameInstance(instanceId: string) {
  const client = useSupabase();
  const queryKey = ['gameInstance', instanceId];
  const queryFn = async () => {
    return getGameInstance(client, instanceId).then((result) => result?.data);
  };
  return useQuery({ queryKey, queryFn });
}

export function useDeleteGameInstance() {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const mutationFn = async ({ instanceId }: { instanceId: string }) => {
    return deleteGameInstance(client, instanceId).then(
      (result) => result?.data,
    );
  };
  const onSuccess = async () => {
    queryClient.invalidateQueries({ queryKey: ['gameInstances'] });
  };
  return useMutation({ mutationFn, onSuccess });
}

export function useGetInstanceGame(instanceId: string) {
  const client = useSupabase();
  const queryKey = ['gameInstanceGame', instanceId];
  const queryFn = async () => {
    return getInstanceGame(client, instanceId).then((result) => result?.data);
  };
  return useQuery({ queryKey, queryFn });
}

export function useGetActiveInstances() {
  const client = useSupabase();
  const queryKey = ['activeInstances'];
  const queryFn = async () => {
    return getActiveInstances(client).then((result) => result?.data);
  };
  return useQuery({ queryKey, queryFn });
}
