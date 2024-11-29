'use client';
import useSupabase from '@/hooks/useSupabase';
import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
} from '@tanstack/react-query';
import {
  insertEvent,
  getEventsForGameInstance,
  deleteEvent,
} from '@/queries/eventqueries';
import { Database } from '@/types/supabase.types';

const key = 'GameInstanceEvents';

export const useGetEventsForGameInstance = (instanceId: string) => {
  const client = useSupabase();
  const queryKey = [key, instanceId];
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
      queryKey: [key, instanceId],
    });
  };
  return useMutation({ mutationFn, onSuccess });
};

export const useDeleteEvent = (instanceId: string) => {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const mutationFn = async (eventId: number) => {
    return deleteEvent(client, eventId);
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [key, 'instanceId'],
    });
  };
  return useMutation({ mutationFn, onSuccess });
};
