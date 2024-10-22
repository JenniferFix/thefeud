import React from 'react';
import { Link } from '@tanstack/react-router';
import StartGame from '@/components/gamecontrol/SelectAndStart';
import ActiveGames from '@/components/home/ActiveGames';
import { useAuthStore } from '@/store';
import { animated, useSpring } from '@react-spring/web';

export default function Index() {
  const user = useAuthStore((state) => state.user);

  const springProps = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: {
      duration: 1200,
    },
  });
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16"></nav>
      <div>
        <animated.h1 style={springProps} className="text-4xl">
          Welcome to The Feud
        </animated.h1>
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
