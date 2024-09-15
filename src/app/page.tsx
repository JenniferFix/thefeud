import AuthButton from '@/components/demo/AuthButton';
import { createClient } from '@/utils/supabase/server';
import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/header/ThemeToggle';
import LoginPanel from '@/components/LoginPanel';
// import { redirect } from 'next/navigation';
import Link from 'next/link';

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
          {!user && <LoginPanel />}
          {user && (
            <div>
              <div>
                <Link href="/e">Go to your editor</Link>
              </div>
              <div>Start a game (coming soon!)</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
