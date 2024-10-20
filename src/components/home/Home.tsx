import React from 'react';
import { Link } from '@tanstack/react-router';
import StartGame from '@/components/gamecontrol/SelectAndStart';
import ActiveGames from '@/components/home/ActiveGames';
import { useAuthStore } from '@/store';

export default function Index() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16"></nav>
      <div>
        <h1 className="text-4xl">Welcome to The Feud</h1>
        <div className="flex gap-4">
          {user && (
            <div>
              <div>
                <Link href="/e">Go to your editor</Link>
              </div>
              <div>Start a game</div>
              <StartGame />
            </div>
          )}
        </div>
      </div>
      <div>
        <ActiveGames userid={user?.id} />
      </div>
    </div>
  );
}
