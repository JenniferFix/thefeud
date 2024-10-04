import { TypedSupabaseClient } from '@/utils/supabase/client';
import type { Database, Tables } from '@/types/supabase.types';

export function getAnswersByQuestionId(
  client: TypedSupabaseClient,
  questionid: string,
) {
  return client
    .from('answers')
    .select('id, answer, score')
    .eq('question_id', questionid)
    .throwOnError()
    .order('score', { ascending: false })
    .order('answer', { ascending: false });
}

export async function updateAnswer(
  client: TypedSupabaseClient,
  params: {
    id: string;
    data: Database['public']['Tables']['answers']['Update'];
  },
) {
  return client
    ?.from('answers')
    .update({ ...params.data })
    .match({ id: params.id })
    .throwOnError();
}

export async function deleteAnswer(client: TypedSupabaseClient, id: string) {
  return client?.from('answers').delete().eq('id', id).throwOnError();
}

export async function insertAnswer(
  client: TypedSupabaseClient,
  // data: Tables<'answers'> & Required<Pick<Tables<'answers'>, 'question_id'>>,
  data: Database['public']['Tables']['answers']['Insert'],
) {
  return client
    ?.from('answers')
    .insert({ ...data })
    .throwOnError();
}
