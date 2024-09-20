'use client';
import React from 'react';
import { useGetInstanceGame } from '@/hooks/useinstancequeries';
import { Button } from '@/components/ui/button';

const GameController = ({ instanceId }: { instanceId: string }) => {
  const [activeTeam, setActiveTeam] = React.useState<number | null>(null);
  const { data, isLoading, isError, error } = useGetInstanceGame(instanceId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  console.log(data);

  const handleTeamToggle = () => {
    //
  };
  return (
    <div>
      <div>GameController</div>
      <div className="flex">
        <Button variant="outline" onClick={() => setActiveTeam(0)}>
          A
        </Button>
        <Button variant="outline" onClick={() => setActiveTeam(1)}>
          B
        </Button>
      </div>
    </div>
  );
};

export default GameController;
