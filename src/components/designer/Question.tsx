import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import Answers from './Answers';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Question = ({ id, text }: { id: string; text: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardContent className="flex justify-between items-center py-2">
          <div>{text}</div>
          <CollapsibleTrigger asChild>
            <Button>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</Button>
          </CollapsibleTrigger>
        </CardContent>
      </Card>
      <CollapsibleContent className="pl-6 pr-3 mt-3">
        <Answers questionid={id} />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Question;
