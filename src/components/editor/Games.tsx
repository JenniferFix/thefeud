'use client';
import React from 'react';
import { useGetGames } from '@/hooks/usegamequeries';
import { useEditorStore } from '@/store';
import { Tables } from '@/types/supabase.types';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const Game = ({ game }: { game: Tables<'games'> }) => {
  return <div></div>;
};

const Games = () => {
  const { data, isError, isLoading, error } = useGetGames();
  const updateSelectedGame = useEditorStore(
    (state) => state.updateEditorSelectedGame,
  );

  // just call it with the new state passed in

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <ToggleGroup
      type="single"
      className="flex flex-col items-start m-2"
      onValueChange={(value) => updateSelectedGame(value)}
    >
      {data?.map((item) => (
        <ToggleGroupItem key={item.id} value={item.id}>
          {item.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
export default Games;
