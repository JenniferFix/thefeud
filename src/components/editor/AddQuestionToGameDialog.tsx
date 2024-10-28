import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrashIcon, PlusIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useAddQuestionToGame } from '@/hooks/usegamequeries';
import Questions from './Questions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { questionsQueryOptions } from '@/hooks/usequestionqueries';
import { useSupabaseAuth } from '@/supabaseauth';
import { cn } from '@/utils/utils';
import { Waiting } from '@/components/ui/waiting';

const AddQuestionToGameModal = ({ gameid }: { gameid: string }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<string | null>(null);
  const auth = useSupabaseAuth();
  const addToGame = useAddQuestionToGame(gameid);
  const questionsQuery = useSuspenseQuery(
    questionsQueryOptions(auth.user?.id!),
  );
  const questions = questionsQuery.data;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selected) return;
    addToGame.mutate({ questionId: selected });
  };

  React.useEffect(() => {
    if (addToGame.status === 'success') {
      setSelected(null);
      setOpen(false);
      addToGame.reset();
    }
  }, [addToGame.status, addToGame.reset]);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button size="sm" variant="default" className="">
          Add <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-5/6">
        <DialogHeader>
          <DialogTitle>Select question:</DialogTitle>
          <DialogDescription>
            Select a question to add to the current game
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <ScrollArea className="border min-h-0 h-[300px]">
            <div
              role="listbox"
              aria-label="scrollable, selectable list of questions"
              className="p-1"
            >
              {questions?.map((q) => (
                <div
                  key={q.id}
                  role="option"
                  aria-selected={selected === q.id}
                  onClick={() => setSelected(q.id)}
                  className={cn(
                    'cursor-pointer px-2 py-1 hover:bg-accent/50 hover:text-accent-foreground',
                    selected === q.id
                      ? 'bg-primary text-primary-foreground'
                      : '',
                  )}
                >
                  {q.question}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button onClick={handleAdd} disabled={addToGame.isPending}>
            {addToGame.isPending ? <Waiting /> : 'Add'}
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionToGameModal;
