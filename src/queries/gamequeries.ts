import { TypedSupabaseClient } from '@/utils/supabase/client';
import { QueryData } from '@supabase/supabase-js';

export function getGames(client: TypedSupabaseClient) {
  return client.from('games').select('*').throwOnError();
}

export function getGameQuestions(client: TypedSupabaseClient, gameId: string) {
  const returnQuery = client
    .from('games')
    .select(`id, questions(id, question)`)
    .match({ id: gameId })
    .throwOnError();
  export type GameQuestions = QueryData<typeof returnQuery>;
  return returnQuery;
}

// export type QueryData<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type GameQuestionsType = QueryData<typeof getGameQuestions>;
