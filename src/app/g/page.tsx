import { createClient } from "@/utils/supabase/server";

export default async function GameCreatorPage() {
  return (
    <div>
      <h1>Game Creator Page</h1>
      <div>You must be logged in</div>
    </div>
  );
}
