'use client';
import React from 'react';
import { useGetInstanceGame } from '@/hooks/useinstancequeries';
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
import { TInstanceGame } from '@/queries/instancequeries';

const AnswersButtons = ({ questionId }: { questionId: string }) => {
  return (
    <div>
      <div>buttons</div>
    </div>
  );
};

const GameController = ({ instanceId }: { instanceId: string }) => {
  const insertEvent = useInsertEvent(instanceId);
  const [activeTeam, setActiveTeam] = React.useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = React.useState<
    string | undefined
  >();
  const { data, isLoading, isError, error } = useGetInstanceGame(instanceId);
  const d = data?.games?.questions?.filter((q) => q.id === currentQuestion);
  const [answers, setAnswers] = React.useState(null);

  React.useEffect(() => {
    if (!currentQuestion) return;
  }, [currentQuestion]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (!data) return <div>no data yet</div>;

  const typedData: TInstanceGame = data;
  console.log(typedData);

  /*
   * Game Events
   * Start Game
   * Question Guess/
   *
   */

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
          <ToggleGroupItem value="0">A</ToggleGroupItem>
          <ToggleGroupItem value="1">B</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <Select value={currentQuestion} onValueChange={handleQuestionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Question" />
          </SelectTrigger>
          <SelectContent>
            {typedData?.games?.questions?.map((question) => (
              <SelectItem value={question.id} key={question.id}>
                {question.question}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {currentQuestion ? (
        <AnswersButtons questionId={currentQuestion} />
      ) : (
        <div>Select questions first</div>
      )}
      <div>
        <Button>Strike</Button>
      </div>
    </div>
  );
};

export default GameController;
