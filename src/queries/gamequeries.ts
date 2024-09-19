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
  return client
    .from('game_questions')
    .insert({ gameid, questionid })
    .throwOnError();
}

export function removeQuestionFromGame(
  client: TypedSupabaseClient,
  questionid: string,
  gameid: string,
) {
  return client
    .from('game_questions')
    .delete()
    .eq('gameid', gameid)
    .eq('questionid', questionid)
    .throwOnError();
}

export function insertGame(client: TypedSupabaseClient, name: string) {
  return client.from('games').insert({ name }).throwOnError();
}

export function updateGame(
  client: TypedSupabaseClient,
  gameId: string,
  gameName: string,
) {
  return client
    .from('games')
    .update({ name: gameName })
    .eq('id', gameId)
    .throwOnError();
}

export function deleteGame(client: TypedSupabaseClient, gameId: string) {
  return client.from('games').delete().eq('id', gameId).throwOnError();
}
