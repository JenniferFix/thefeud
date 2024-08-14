import { TypedSupabaseClient } from "@/utils/supabase/client";
import type { Database } from "@/types/supabase.types";

export function getUsersQuestions(client: TypedSupabaseClient) {
  return client.from("questions").select("*");
}

export async function updateQuestion(
  client: TypedSupabaseClient,
  params: { id: string; question: string },
) {
  return client
    ?.from("questions")
    .update({ question: params.question })
    .match({ id: params.id })
    .throwOnError()
    .single();
}
