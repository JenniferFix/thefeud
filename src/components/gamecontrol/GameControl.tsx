'use client';
import React from 'react';
import { useGetGameQuestions } from '@/hooks/usegamequeries';
import { TGameQuestions } from '@/queries/gamequeries';
import { useGetAnswersByQuestionId } from '@/hooks/useanswerqueries';
import { useInsertEvent } from '@/hooks/useeventqueries';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GameActions } from '@/types';

const Buttons = ({
  instanceId,
  activeTeam,
  questionId,
}: {
  instanceId: string;
  activeTeam: number | null | undefined;
  questionId: string;
}) => {
  const insertEvent = useInsertEvent(instanceId);
  const { data, isLoading, isError, error } =
    useGetAnswersByQuestionId(questionId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  console.log(data);
  return (
    <div>
      {data?.map((item) => (
        <Button
          disabled={!Boolean(activeTeam)}
          onClick={() =>
            insertEvent.mutate({
              instanceid: instanceId,
              team: activeTeam,
              answerid: item.id,
              eventid: GameActions.CorrectQuestion,
            })
          }
        >
          {item.answer}
        </Button>
      ))}
    </div>
  );
};

const GameControl = ({
  instanceId,
  gameId,
}: {
  instanceId: string;
  gameId: string;
}) => {
  const insertEvent = useInsertEvent(instanceId);
  const [activeTeam, setActiveTeam] = React.useState<number | null | undefined>(
    null,
  );
  const [currentQuestion, setCurrentQuestion] = React.useState<
    string | undefined
  >();
  const { data, isLoading, isError, error } = useGetGameQuestions(gameId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (!data) return <div>no data yet</div>;

  const typedData: TGameQuestions = data;

  const handleTeamToggle = (value: string) => {
    setActiveTeam(parseInt(value));
  };

  const handleQuestionChange = (value: string) => {
    setCurrentQuestion(value);
    insertEvent.mutate({
      eventid: GameActions.StartQuestion,
      instanceid: instanceId,
      questionid: value,
    });
  };
  return (
    <div>
      <div>GameController</div>
      <div className="flex">
        <ToggleGroup type="single" onValueChange={handleTeamToggle}>
          <ToggleGroupItem value="1">A</ToggleGroupItem>
          <ToggleGroupItem value="2">B</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <Select value={currentQuestion} onValueChange={handleQuestionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Question" />
          </SelectTrigger>
          <SelectContent>
            {typedData?.questions!.map((question) => (
              <SelectItem value={question.id} key={question.id}>
                {question.question}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {currentQuestion ? (
        <Buttons
          questionId={currentQuestion}
          activeTeam={activeTeam}
          instanceId={instanceId}
        />
      ) : (
        <div>Select Question</div>
      )}
      <div>
        <Button
          disabled={!Boolean(activeTeam)}
          onClick={() =>
            insertEvent.mutate({
              team: activeTeam,
              instanceid: instanceId,
              eventid: GameActions.IncorrectGuess,
            })
          }
        >
          Strike
        </Button>
      </div>
    </div>
  );
};

export default GameControl;
