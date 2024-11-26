import React from 'react';
import { getRouteApi, useNavigate, useParams } from '@tanstack/react-router';
import AnswerButtons from './AnswerButtons';
import { useInsertEvent } from '@/hooks/useeventqueries';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { GameActions } from '@/types';
import { Button } from '@/components/ui/button';
import { useSuspenseQuery } from '@tanstack/react-query';
import { answersByQuestionIdQueryOptions } from '@/hooks/useanswerqueries';
import { getInstanceGameQueryOptions } from '@/hooks/useinstancequeries';
import { getQuestionQueryOptions } from '@/hooks/usequestionqueries';
import SelectWinner from '@/components/gamecontrol/SelectWinner';

const routeApi = getRouteApi(
  '/_navbar-layout/_auth/c/$gameInstanceId/$questionId',
);

const QuestionPage = ({
  questionId,
  instanceId,
}: {
  questionId: string;
  instanceId: string;
}) => {
  const navigate = useNavigate();
  // const params = Route.useParams();
  const insertEvent = useInsertEvent(instanceId);
  const [activeTeam, setActiveTeam] = React.useState<number | null | undefined>(
    null,
  );
  const { data, isLoading, isError, error } = useSuspenseQuery(
    getQuestionQueryOptions(questionId),
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error?.message}</div>;

  const handleTeamToggle = (value: string) => {
    setActiveTeam(parseInt(value));
  };

  const handleTeamWin = () => {
    if (!activeTeam) return;
    insertEvent.mutate({
      eventid: GameActions.TeamWin,
      instanceid: instanceId,
      questionid: questionId,
      team: activeTeam,
    });
    navigate({ to: `/c/${instanceId}` });
  };
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl flex justify-center py-2">{data?.question}</h3>
      <AnswerButtons instanceId={instanceId} questionId={questionId} />
      {/* <div> */}
      {/*   <ToggleGroup type="single" onValueChange={handleTeamToggle}> */}
      {/*     <ToggleGroupItem value="1">A</ToggleGroupItem> */}
      {/*     <ToggleGroupItem value="2">B</ToggleGroupItem> */}
      {/*   </ToggleGroup> */}
      {/*   <Button onClick={handleTeamWin} disabled={!Boolean(activeTeam)}> */}
      {/*     {activeTeam ? 'Team ' + activeTeam + ' wins' : 'Select winning team'} */}
      {/*   </Button> */}
      {/* </div> */}
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
