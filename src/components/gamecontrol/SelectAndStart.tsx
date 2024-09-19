'use client';
import React from 'react';
import { useGetGames } from '@/hooks/usegamequeries';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/utils';
import useSupabase from '@/hooks/useSupabase';
import { useCreateGameInstance } from '@/hooks/useinstancequeries';

const SelectAndStart = async () => {
  const { data, isError, isLoading, error } = useGetGames();
  const [selectedGame, setSelectedGame] = React.useState<string | null>(null);
  const supabase = useSupabase();
  const createGameInstance = useCreateGameInstance();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  const handleStartGame = (e: React.MouseEvent<HTMLElement>) => {
    if (!selectedGame) return;
    e.preventDefault();

    // createGameInstance.mutate({ gameId: selectedGame });
    // create a game instance in the db
    // redirect to game controller page
  };

  const createGameAction = async () => {
    'use server';
    if (!selectedGame) return;
    console.log(selectedGame);
  };

  return (
    <React.Fragment>
      <div className="w-[300px] border rounded-sm my-2">
        <ScrollArea className="h-[200px]">
          <div
            role="listbox"
            aria-label="Scrollable listbox of games"
            className=""
          >
            {data?.map((g) => (
              <div
                key={g.id}
                role="option"
                area-selected={selectedGame === g.id}
                onClick={() => setSelectedGame(g.id)}
                className={cn(
                  'cursor-pointer px-2 py-1 rounded-sm',
                  selectedGame === g.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted',
                )}
              >
                {g.name}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <Button
        variant="default"
        onClick={handleStartGame}
        formAction={createGameAction}
      >
        Start Game
      </Button>
    </React.Fragment>
  );
};

export default SelectAndStart;
