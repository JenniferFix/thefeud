import React from 'react';
import { Link } from '@tanstack/react-router';
import StartGame from '@/components/gamecontrol/SelectAndStart';
import ActiveGames from '@/components/ActiveGames';
import { animated, useSpring } from '@react-spring/web';
import { useSupabaseAuth } from '@/supabaseauth';

export default function Index() {
  const auth = useSupabaseAuth();
  console.log(auth?.user?.id);
  const springProps = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: {
      duration: 1200,
    },
  });
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center mt-4">
      <div>
        <animated.h1 style={springProps} className="text-4xl">
          Welcome to The Feud
        </animated.h1>
        <div className="flex gap-4">
          {auth.isAuthenticated && (
            <div>
              <div>
                <Link href="/e">Go to your editor</Link>
              </div>
              <div>Start a game</div>
              {auth?.user?.id && <StartGame />}
            </div>
          )}
        </div>
      </div>
      <div>
        <ActiveGames userid={auth.user?.id} />
      </div>
    </div>
  );
}
