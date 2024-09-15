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
  return returnQuery;
}
// export type QueryData<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type TGameQuestions = QueryData<ReturnType<typeof getGameQuestions>>;

export function addQuestionToGame(
  client: TypedSupabaseClient,
  questionid: string,
  gameid: string,
) {
  client.from('game_questions').insert({ gameid, questionid }).throwOnError();
}

export function removeQuestionFromGame(
  client: TypedSupabaseClient,
  questionid: string,
  gameid: string,
) {
  client
    .from('game_questions')
    .delete()
    .eq('gameid', gameid)
    .eq('questionid', questionid)
    .throwOnError();
}
