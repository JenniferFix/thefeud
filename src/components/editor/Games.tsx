'use client';
import React from 'react';
import { useGetGames } from '@/hooks/usegamequeries';
import { useEditorStore } from '@/store';
import { Tables } from '@/types/supabase.types';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  TrashIcon,
  PlusIcon,
  DashIcon,
  CheckIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  useInsertGame,
  useUpdateGame,
  useDeleteGame,
} from '@/hooks/usegamequeries';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
type TGameRow = Tables<'games'>;

const gameSchema = z.object({
  name: z.string(),
});

const Game = ({ game, addGame }: { game?: TGameRow; addGame?: boolean }) => {
  const selectedGame = useEditorStore((state) => state?.editorSelectedGame);
  const insertGame = useInsertGame();
  const updateGame = useUpdateGame();
  const deleteGame = useDeleteGame();
  const form = useForm<z.infer<typeof gameSchema>>({
    resolver: zodResolver(gameSchema),
    values: {
      name: game?.name ?? '',
    },
  });

  const handleDelete = () => {
    deleteGame.mutate({ gameId: game?.id! });
  };

  const handleSubmit = (values: z.infer<typeof gameSchema>) => {
    if (!addGame) return;
    console.log('handleSubmit');
    insertGame.mutate({ name: values.name });
    form.reset();
  };

  const handleBlur = (values: z.infer<typeof gameSchema>) => {
    if (addGame) return;
    console.log('handleBlur');
    if (!form.formState.isDirty) return;
    updateGame.mutate({ gameId: game?.id!, name: values.name });
  };

  const isSelected = game?.id === selectedGame;
  return (
    <div key={game?.id} className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onBlur={form.handleSubmit(handleBlur)}
          className="w-full flex"
        >
          {!addGame && (
            <ToggleGroupItem key={game?.id!} value={game?.id!}>
              {isSelected ? <CheckIcon /> : <DashIcon />}
            </ToggleGroupItem>
          )}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <Input {...field} className="w-full" placeholder="Game Name" />
            )}
          />
          {!addGame ? (
            <Button size="icon" variant="ghost" onClick={handleDelete}>
              <TrashIcon />
            </Button>
          ) : (
            <Button type="submit" variant="ghost" size="icon">
              <PlusIcon />
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

const Games = () => {
  const { data, isError, isLoading, error } = useGetGames();

  const updateSelectedGame = useEditorStore(
    (state) => state.updateEditorSelectedGame,
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <ToggleGroup
        type="single"
        className="flex flex-col items-start justify-start "
        onValueChange={(value) => updateSelectedGame(value)}
      >
        {data?.map((g) => <Game key={g.id} game={g} />)}
      </ToggleGroup>
      <div className="p-2">
        <Game addGame />
      </div>
    </div>
  );
};
export default Games;
