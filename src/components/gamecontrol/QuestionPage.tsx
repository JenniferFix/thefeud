import React from 'react';
import AnswerButtons from './AnswerButtons';
import { useInsertEvent } from '@/hooks/useeventqueries';
import { GameActions } from '@/types';
import { Button } from '@/components/ui/button';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getQuestionQueryOptions } from '@/hooks/usequestionqueries';
import SelectWinner from '@/components/gamecontrol/SelectWinner';

const QuestionPage = ({
  questionId,
  instanceId,
}: {
  questionId: string;
  instanceId: string;
}) => {
  const insertEvent = useInsertEvent(instanceId);
  const [activeTeam, setActiveTeam] = React.useState<number | null | undefined>(
    null,
  );
  const { data, isLoading, isError, error } = useSuspenseQuery(
    getQuestionQueryOptions(questionId),
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error?.message}</div>;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl flex justify-center py-2">{data?.question}</h3>
      <AnswerButtons instanceId={instanceId} questionId={questionId} />
      <Button
        className="w-full"
        onClick={() =>
          insertEvent.mutate({
            team: activeTeam,
            instanceid: instanceId,
            eventid: GameActions.Strike,
          })
        }
      >
        Strike
      </Button>
      <SelectWinner instanceId={instanceId} questionId={questionId} />
    </div>
  );
};

export default QuestionPage;
