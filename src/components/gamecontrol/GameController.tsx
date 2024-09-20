'use client';
import React from 'react';
import { useGetInstanceGame } from '@/hooks/useinstancequeries';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { TInstanceGame } from '@/queries/instancequeries';

const GameController = ({ instanceId }: { instanceId: string }) => {
  const [activeTeam, setActiveTeam] = React.useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = React.useState<string | null>(
    null,
  );
  const { data, isLoading, isError, error } = useGetInstanceGame(instanceId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (!data) return <div>no data yet</div>;

  const typedData: TInstanceGame = data;
  console.log(typedData);

  /*
   * Game Events
   * Start Game
   * Question Guess
   *
   */

  const handleTeamToggle = (value: string) => {
    setActiveTeam(parseInt(value));
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
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Game" />
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
      <div>Answers</div>
      <div>
        <Button>Strike</Button>
      </div>
    </div>
  );
};

export default GameController;
