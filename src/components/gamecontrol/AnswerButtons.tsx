import React from 'react';
import { Button } from '@/components/ui/button';
import { useInsertEvent } from '@/hooks/useeventqueries';
import { GameActions } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { answersByQuestionIdQueryOptions } from '@/hooks/useanswerqueries';

const AnswerButtons = ({
  instanceId,
  questionId,
}: {
  instanceId: string;
  questionId: string;
}) => {
  const insertEvent = useInsertEvent(instanceId);
  const { data, isLoading, isError, error } = useSuspenseQuery(
    answersByQuestionIdQueryOptions(questionId),
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="grid grid-cols-2 grid-rows-4 grid-flow-col h-full">
      {data?.map((item) => (
        <Button
          key={'actionbutton' + item.id}
          onClick={() =>
            insertEvent.mutate({
              instanceid: instanceId,
              // team: activeTeam,
              answerid: item.id,
              eventid: GameActions.CorrectAnswer,
              points: item.score,
            })
          }
        >
          {item.answer}
        </Button>
      ))}

      {data &&
        Array.from({ length: 8 - data?.length }, (_e, i) => (
          <Button key={'extrabtn' + i} disabled={true}></Button>
        ))}
    </div>
  );
};

export default AnswerButtons;
