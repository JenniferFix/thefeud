import { TypedSupabaseClient } from '@/utils/supabase/client';

export function getGames(client: TypedSupabaseClient) {
  return client.from('games').select('*').throwOnError();
}
