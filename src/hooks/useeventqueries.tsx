'use client';
import useSupabase from '@/hooks/useSupabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { insertEvent, getEventsForGameInstance } from '@/queries/eventqueries';
import { Database } from '@/types/supabase.types';

export const useGetEventsForGameInstance = (instanceId: string) => {
  const client = useSupabase();
  const queryKey = ['GameInstanceEvents', instanceId];
  const queryFn = async () => {
    return getEventsForGameInstance(client, instanceId).then(
      (result) => result?.data,
    );
  };
  return useQuery({ queryKey, queryFn });
};

export const useInsertEvent = (instanceId: string) => {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const mutationFn = async (
    event: Database['public']['Tables']['game_events']['Insert'],
  ) => {
    return insertEvent(client, event);
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['GameInstanceEvents', instanceId],
    });
  };
  return useMutation({ mutationFn, onSuccess });
};
