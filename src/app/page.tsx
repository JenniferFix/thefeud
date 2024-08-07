import DeployButton from "@/components/demo/DeployButton";
import AuthButton from "@/components/demo/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/demo/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/demo/tutorial/SignUpUserSteps";
import Header from "@/components/demo/Header";
import Navbar from "@/components/Navbar";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Navbar />
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <div>
        <h1 className="text-4xl">Welcome to The Feud</h1>
        <div className="flex gap-4">
          <div>
            If you were invited to a game please enter the game code below.
          </div>
          <div>
            Login or create an account to create surveys and host your own game.
          </div>
        </div>
      </div>
    </div>
  );
}
