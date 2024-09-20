'use client';
import useSupabase from '@/hooks/useSupabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { insertEvent, getEventsForGame } from '@/queries/eventqueries';
import { Database, Tables } from '@/types/supabase.types';

export const useGetEventsForGame = () => {
  const client = useSupabase();
  const queryKey = ['games'];
  //
};

export const useInsertEvent = (instanceId: string) => {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const mutationFn = async ({
    event,
  }: {
    event: Database['public']['Tables']['game_events']['Insert'];
  }) => {
    return insertEvent(client, event);
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['gameevents', instanceId] });
  };
  return useMutation({ mutationFn, onSuccess });
};
