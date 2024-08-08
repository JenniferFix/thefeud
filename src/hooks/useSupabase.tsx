import { useMemo } from "react";
import { getSupabaseBrowserClient } from "@/utils/supabase/client";

getSupabaseBrowserClient;
function useSupabase() {
  return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabase;
