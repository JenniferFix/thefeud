'use client';
import React from 'react';
import { redirect } from '@tanstack/react-router';
import { useGetGames } from '@/hooks/usegamequeries';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/utils';
import { useCreateGameInstance } from '@/hooks/useinstancequeries';

const SelectAndStart = () => {
  const { data, isError, isLoading, error } = useGetGames();
  const [selectedGame, setSelectedGame] = React.useState<string | null>(null);
  const createGameInstance = useCreateGameInstance();
  const {
    data: instanceData,
    isSuccess: isInstanceSuccess,
    isError: isInstanceError,
  } = createGameInstance;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  // if the component renders and we have the id of the new game,
  // we redirect to the game controller page
  if (!isInstanceError && isInstanceSuccess && instanceData) {
    if (instanceData) redirect({ to: `/c/${instanceData[0].id}` });
  }

  const handleStartGame = (e: React.MouseEvent<HTMLElement>) => {
    if (!selectedGame) return;
    e.preventDefault();
    createGameInstance.mutate({ gameId: selectedGame });
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
                aria-selected={selectedGame === g.id}
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
      <Button variant="default" onClick={handleStartGame}>
        Start Game
      </Button>
    </React.Fragment>
  );
};

export default SelectAndStart;
