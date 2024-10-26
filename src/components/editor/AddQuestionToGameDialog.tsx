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
import AllQuestionsPanel from '@/components/editor/AllQuestionsPanel';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusIcon } from 'lucide-react';
import { useAddQuestionToGame } from '@/hooks/usegamequeries';

const AddQuestionToGameModal = ({ gameid }: { gameid: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="default">
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
        <ScrollArea className="border h-full">
          <AllQuestionsPanel />
        </ScrollArea>
        <DialogFooter>
          <Button>Add</Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionToGameModal;
