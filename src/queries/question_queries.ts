import { TypedSupabaseClient } from "@/utils/supabase/client";
export function getUsersQuestionsById(client: TypedSupabaseClient) {
  return client?.from("questions").select("*");
}
