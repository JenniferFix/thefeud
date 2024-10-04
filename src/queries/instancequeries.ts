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

export type TInstance = QueryData<ReturnType<typeof getInstanceGame>>;
