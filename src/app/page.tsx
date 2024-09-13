import AuthButton from '@/components/demo/AuthButton';
import { createClient } from '@/utils/supabase/server';
import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/header/ThemeToggle';
import LoginPanel from '@/components/LoginPanel';
// import { redirect } from 'next/navigation';

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect('/login');
  // }
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Navbar />
          <AuthButton />
          <ThemeToggle />
        </div>
      </nav>
      <div>
        <h1 className="text-4xl">Welcome to The Feud</h1>
        <div className="flex gap-4">
          <div>
            If you were invited to a game please enter the game code below.
          </div>
          <div>
            <h3>
              Login or create an account to create surveys and host your own
              game.
            </h3>
            {!user && <LoginPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}
