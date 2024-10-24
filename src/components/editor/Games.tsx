import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEditorStore } from '@/store';
import { Tables } from '@/types/supabase.types';
import {
  TrashIcon,
  PlusIcon,
  DashIcon,
  CheckIcon,
  Pencil1Icon,
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
import { gamesQueryOptions } from '@/hooks/usegamequeries';
import { Link } from '@tanstack/react-router';
type TGameRow = Tables<'games'>;

const gameSchema = z.object({
  name: z.string(),
});

const Game = ({ game, addGame }: { game?: TGameRow; addGame?: boolean }) => {
  const [editing, setEditing] = React.useState(false);
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

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleSubmit = (values: z.infer<typeof gameSchema>) => {
    if (!addGame) return;
    insertGame.mutate({ name: values.name });
    form.reset();
  };

  const handleBlur = (values: z.infer<typeof gameSchema>) => {
    if (addGame) return;
    if (!form.formState.isDirty) return;
    updateGame.mutate({ gameId: game?.id!, name: values.name });
  };

  return (
    <div key={game?.id} className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onBlur={form.handleSubmit(handleBlur)}
          className="w-full flex"
        >
          {editing || addGame ? (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Input {...field} className="w-full" placeholder="Game Name" />
              )}
            />
          ) : (
            <Button
              variant="link"
              size="lg"
              asChild
              className="w-full pl-4 justify-start"
            >
              <Link to={`/e/${game?.id}`}>{game?.name}</Link>
            </Button>
          )}
          {!addGame ? (
            <div className="flex">
              <Button size="icon" variant="ghost" onClick={handleEditing}>
                <Pencil1Icon />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleDelete}>
                <TrashIcon />
              </Button>
            </div>
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
  const gamesQuery = useSuspenseQuery(gamesQueryOptions);
  const games = gamesQuery.data;

  return (
    <div className="flex flex-col justify-start h-full w-full gap-1">
      {games?.map((g) => <Game key={g.id} game={g} />)}
      <div className="p-2">
        <Game addGame />
      </div>
    </div>
  );
};
export default Games;
