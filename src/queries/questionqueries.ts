import { TypedSupabaseClient } from '@/utils/supabase/client';
<<<<<<< HEAD
// import type { Database } from '@/types/supabase.types';

export function getUsersQuestions(client: TypedSupabaseClient) {
  return client.from('questions').select('*');
}

export function getQuestionFromId(
  client: TypedSupabaseClient,
  questionId: string,
) {
  return client
    .from('questions')
    .select('question')
    .eq('id', questionId)
    .throwOnError()
    .single();
}

export async function insertQuestion(
  client: TypedSupabaseClient,
  question: string,
) {
  return client.from('questions').insert({ question }).throwOnError();
}

export async function updateQuestion(
  client: TypedSupabaseClient,
  params: { id: string; question: string },
) {
  return client
    ?.from('questions')
    .update({ question: params.question })
    .match({ id: params.id })
    .throwOnError()
    .single();
}

export async function deleteQuestion(client: TypedSupabaseClient, id: string) {
  return client.from('questions').delete().eq('id', id).throwOnError();
=======
import type { Database, Tables } from '@/types/supabase.types';

export function getAnswersByQuestionId(
  client: TypedSupabaseClient,
  questionid: string,
) {
  return client
    .from('answers')
    .select('*')
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
>>>>>>> main
}
