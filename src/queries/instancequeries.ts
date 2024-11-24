import { TypedSupabaseClient } from '@/utils/supabase/client';
import { QueryData } from '@supabase/supabase-js';

export function createGameInstance(
  client: TypedSupabaseClient,
  gameId: string,
) {
  return client
    .from('game_instance')
    .insert({ game: gameId })
    .throwOnError()
    .select()
    .throwOnError();
}

export function getGameInstance(
  client: TypedSupabaseClient,
  instanceId: string,
) {
  return client
    .from('game_instance')
    .select('*')
    .eq('id', instanceId)
    .throwOnError()
    .single();
}

export function deleteGameInstance(
  client: TypedSupabaseClient,
  instanceId: string,
) {
  return client
    .from('game_instance')
    .delete()
    .eq('id', instanceId)
    .throwOnError();
}

export function getInstanceGame(
  client: TypedSupabaseClient,
  instanceId: string,
) {
  return (
    client
      .from('game_instance')
      // .select('*')
      .select('id, games(id, name)')
      .eq('id', instanceId)
      .throwOnError()
      .single()
  );
}

export function getActiveInstances(client: TypedSupabaseClient) {
  // Select events within last 10 min
  // get the instance id's of those
  // dedupe and get the actual instances
  const prevTime = new Date();
  prevTime.setHours(prevTime.getHours() - 2);
  return client
    .from('game_instance')
    .select('id, created_at, userid, games(id,name)')
    .gt('created_at', prevTime.toISOString())
    .order('created_at', { ascending: false })
    .throwOnError();
}
export function getUserInstances(client: TypedSupabaseClient, userId: string) {
  return client
    .from('game_instance')
    .select('id, created_at, userid, games(id,name)')
    .order('created_at', { ascending: false })
    .throwOnError();
}

export type TInstance = QueryData<ReturnType<typeof getInstanceGame>>;
