import { TypedSupabaseClient } from '@/utils/supabase/client';
// import type { Database } from '@/types/supabase.types';

export function getUsersQuestions(client: TypedSupabaseClient) {
  return client.from('questions').select('*');
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
}
