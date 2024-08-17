import { TypedSupabaseClient } from '@/utils/supabase/client';
import type { Database, Tables } from '@/types/supabase.types';

export function getAnswersByQuestionId(
  client: TypedSupabaseClient,
  questionid: string,
) {
  return client
    .from('answers')
    .select('*')
    .eq('question_id', questionid)
    .throwOnError();
}

export async function updateAnswer(
  client: TypedSupabaseClient,
  params: { id: string; data: Database['public']['Tables']['answers']['Update'] },
) {
  return client
    ?.from('answers')
    .update({ answer: params.answer, score: params.score })
    .match({ id: params.id })
    .throwOnError()
    .single();
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
