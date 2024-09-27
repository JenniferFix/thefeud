'use client';
import React from 'react';
import { MergeDeep } from 'type-fest';
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
import { type TInstance } from '@/queries/instancequeries';
import { Database } from '@/types/supabase.types';

type TempType = MergeDeep<
  TInstance,
  {
    games: {
      questions: TInstance['games'][];
    };
  }
>;

type Temp2 = MergeDeep<
  TempType,
  {
    games: {
      questions: TempType['games']['questions'][];
    };
  }
>;

type GoodType = MergeDeep<
  Temp2,
  {
    games: {
      questions: {
        answers: Database['public']['Tables']['answers']['Update'][];
      };
    };
  }
>;

type TQuestions = TempType['games']['questions'];

const AnswersButtons = ({
  answers,
}: {
  answers: GoodType['games']['questions']['answers'];
}) => {
  return (
    <div>{answers?.map((answer) => <Button>{answer.answer}</Button>)}</div>
  );
};

const GameController = ({ instanceId }: { instanceId: string }) => {
  const insertEvent = useInsertEvent(instanceId);
  const [activeTeam, setActiveTeam] = React.useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = React.useState<
    string | undefined
  >();
  const { data, isLoading, isError, error } = useGetInstanceGame(instanceId);
  React.useEffect(() => {
    //
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (!data) return <div>no data yet</div>;

  const typedData: TInstance = data;
  console.log(typedData);

  const question = typedData?.games?.questions?.filter(
    (i) => i.id === currentQuestion,
  );

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
        <AnswersButtons answers={question?.answers!} />
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
