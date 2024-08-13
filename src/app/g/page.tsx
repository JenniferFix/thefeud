import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
// import QuestionPanel from "@/components/designer/QuestionPanel";
import Questions from "@/components/designer/Questions";

export default async function GameCreatorPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  return (
    <div>
      <h1>Game Creator Page</h1>
      <div>You must be logged in, welcome {user.email}</div>
      <div>
        <Questions />
      </div>
    </div>
  );
}