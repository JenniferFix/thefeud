import React from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { useGetUsersQuestions } from '@/hooks/usequestionqueries';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import Answers from './Answers';
import { useEditorStore } from '@/store';

const Question = ({ id, text }: { id: string; text: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full px-3 p-1"
    >
      <ToggleGroupItem value={id} className="w-full">
        <div className="flex justify-between items-center w-full py-2">
          <div>{text}</div>
          <CollapsibleTrigger asChild>
            <Button size="icon" variant="ghost">
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
          </CollapsibleTrigger>
        </div>
      </ToggleGroupItem>
      <CollapsibleContent className="pl-6 pr-3 mt-3">
        <Answers questionid={id} />
      </CollapsibleContent>
    </Collapsible>
  );
};

const Questions = () => {
  const { isError, data, error, isLoading } = useGetUsersQuestions();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return data?.map((q) => (
    <Question key={q.id} id={q.id} text={q.question ?? ''} />
  ));
};

const QuestionsPanel = () => {
  const updateSelected = useEditorStore(
    (state) => state.updateEditorSelectedFromAllQuestions,
  );
  return (
    <div className="flex flex-col justify-apart h-full w-full p-1">
      <ToggleGroup
        type="single"
        className="h-full items-start justify-start w-full"
        onValueChange={(value) => updateSelected(value)}
      >
        <Questions />
      </ToggleGroup>
      <Button size="lg" variant="default" className="w-full">
        Add
      </Button>
    </div>
  );
};

export default QuestionsPanel;
