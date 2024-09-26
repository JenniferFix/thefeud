import { TypedSupabaseClient } from '@/utils/supabase/client';
// import { QueryData } from '@supabase/supabase-js';
import { Database } from '@/types/supabase.types';

export const insertEvent = (
  client: TypedSupabaseClient,
  event: Database['public']['Tables']['game_events']['Insert'],
) => {
  return client
    .from('game_events')
    .insert({ ...event })
    .throwOnError();
};

export const getEventsForGameInstance = (
  client: TypedSupabaseClient,
  instanceId: string,
) => {
  return client
    .from('game_events')
    .select('*')
    .eq('instanceid', instanceId)
    .throwOnError();
};
