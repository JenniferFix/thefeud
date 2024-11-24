import React from 'react';
import { getInstanceGameQueryOptions } from '@/hooks/useinstancequeries';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  useGetGameQuestions,
  gameQuestionsQueryOptions,
} from '@/hooks/usegamequeries';
import { useInsertEvent } from '@/hooks/useeventqueries';
import { GameActions } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/utils/utils';
import { useNavigate } from '@tanstack/react-router';

const QuestionSelector = ({
  instanceId,
  gameId,
}: {
  instanceId: string;
  gameId: string;
}) => {
  const navigate = useNavigate();
  const insertEvent = useInsertEvent(instanceId);
  const { data, isLoading, isError, error } = useSuspenseQuery(
    gameQuestionsQueryOptions(gameId),
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const handleQuestionClick = (questionid: string) => {
    // setCurrentQuestion(value);
    insertEvent.mutate({
      eventid: GameActions.StartQuestion,
      instanceid: instanceId,
      questionid,
    });
    navigate({ to: `/c/${instanceId}/${questionid}` });
  };

  return (
    <ScrollArea className="grow h-full">
      <div
        role="listbox"
        aria-label="Scrollable listbox of games"
        className="h-full"
      >
        {data?.questions?.map((question) => (
          <div
            key={question.id}
            onClick={() => handleQuestionClick(question.id)}
            className={cn(
              'cursor-pointer px-2 py-1 rounded-sm',
              'hover:bg-muted',
            )}
          >
            {question.question}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default QuestionSelector;
