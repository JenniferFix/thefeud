import { TypedSupabaseClient } from '@/utils/supabase/client';
// import type { Database, Tables } from '@/types/supabase.types';

export function getAllGames(client: TypedSupabaseClient) {
  return client.from('games').select('*').throwOnError();
}
