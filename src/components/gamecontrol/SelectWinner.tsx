import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useInsertEvent } from '@/hooks/useeventqueries';
import { GameActions } from '@/types';
import { useNavigate } from '@tanstack/react-router';

const SelectWinner = ({
  instanceId,
  questionId,
}: {
  instanceId: string;
  questionId: string;
}) => {
  const insertEvent = useInsertEvent(instanceId);
  const navigate = useNavigate();

  const handleTeamWin = (team: number) => {
    insertEvent.mutate({
      eventid: GameActions.TeamWin,
      instanceid: instanceId,
      team: team,
    });
    navigate({ to: `/c/${instanceId}` });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select round winner</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel>Select Winner</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleTeamWin(1)}>
          Left Team
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleTeamWin(2)}>
          Right Team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectWinner;
