import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Tables } from '@/types/supabase.types';
import { TrashIcon, PlusIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  useInsertGame,
  useUpdateGame,
  useDeleteGame,
} from '@/hooks/usegamequeries';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { gamesQueryOptions } from '@/hooks/usegamequeries';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from '@tanstack/react-router';
import { cn } from '@/utils/utils';
import { WarningDialog } from '@/components/ui/warning';
import { Waiting } from '@/components/ui/waiting';
type TGameRow = Tables<'games'>;

const gameSchema = z.object({
  name: z.string(),
});

const Game = ({ game, add }: { game?: TGameRow; add?: boolean }) => {
  const [editing, setEditing] = React.useState(false);
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
    if (!add) return;
    insertGame.mutate({ name: values.name });
    form.reset();
  };

  const handleBlur = (values: z.infer<typeof gameSchema>) => {
    if (add) return;
    if (!form.formState.isDirty) return;
    updateGame.mutate({ gameId: game?.id!, name: values.name });
  };

  return (
    <div className="w-full flex items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onBlur={form.handleSubmit(handleBlur)}
          className={cn('w-full flex items-center gap-2', add ? 'pb-3' : '')}
        >
          {editing || add ? (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className={cn('grow', add ? '' : '')}>
                  <FormControl>
                    <Input {...field} variant="list" placeholder="Game Name" />
                  </FormControl>
                </FormItem>
              )}
            />
          ) : (
            <Link
              to={`/e/games/${game?.id}`}
              className="w-full flex items-center pl-2"
              activeProps={{ className: 'font-bold' }}
            >
              {game?.name}
            </Link>
          )}
          {!add ? (
            <div className="flex items-center">
              <Button size="icon" variant="ghost" onClick={handleEditing}>
                <Pencil1Icon />
              </Button>
              <WarningDialog onClick={handleDelete}>
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={deleteGame.isPending}
                >
                  {deleteGame.isPending ? <Waiting /> : <TrashIcon />}
                </Button>
              </WarningDialog>
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
    <section className="flex flex-col justify-between h-full w-full gap-2 pt-3 px-2">
      <ScrollArea className="flex flex-col justify-start h-full">
        {games?.map((g) => <Game key={g.id} game={g} />)}
      </ScrollArea>
      <Game add />
    </section>
  );
};
export default Games;
