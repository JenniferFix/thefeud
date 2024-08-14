import { TypedSupabaseClient } from "@/utils/supabase/client";
import type { Database } from "@/types/supabase.types";

export function getAnswersByQuestionId(
  client: TypedSupabaseClient,
  questionid: string,
) {
  return client
    .from("answers")
    .select("*")
    .eq("question_id", questionid)
    .throwOnError();
}

export async function updateAnswer(
  client: TypedSupabaseClient,
  params: { id: string; answer: string; score: number },
) {
  return client
    ?.from("answers")
    .update({ answer: params.answer, score: params.score })
    .match({ id: params.id })
    .throwOnError()
    .single();
}
