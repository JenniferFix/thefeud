import React from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import Answers from './Answers';

const Question = ({ id, text }: { id: string; text: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full px-3 p-1"
    >
      <div className="flex justify-between items-center w-full py-2">
        <ToggleGroupItem
          value={id}
          className="w-full justify-start rounded-none rounded-l-md"
        >
          <div>{text}</div>
        </ToggleGroupItem>
        <CollapsibleTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none rounded-r-md"
          >
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pl-6 pr-3 mt-3">
        <Answers questionid={id} />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Question;
