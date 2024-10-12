'use client';
import React from 'react';
import GameBg from '@/components/show/GameBg';
import Gameboard from './Gameboard3D';
import Strike from './Strike';
import { Tables } from '@/types/supabase.types';

type TEvents = Tables<'game_events'>;

import useFeudEvents from '@/hooks/useFeudEvents';

const Game = ({ instanceId }: { instanceId: string }) => {
  const {
    isLoading,
    // isError,
    answers,
    answered,
    leftTeamScore,
    rightTeamScore,
    roundScore,
    showStrike,
    strikes,
    currentQuestion,
    currentQuestionText,
  } = useFeudEvents({ instanceId, sound: true });

  if (isLoading) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <div>
        <GameBg
          board={<Gameboard answers={answers} answered={answered} />}
          leftTeam={leftTeamScore}
          rightTeam={rightTeamScore}
          overheadScore={roundScore}
          question={currentQuestionText}
        />
      </div>
      {showStrike && <Strike count={strikes} />}
    </React.Fragment>
  );
};

export default Game;
