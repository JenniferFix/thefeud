'use client';
import React from 'react';
import GameBg from './GameBg';
import Gameboard from './Gameboard';
import useSupabase from '@/hooks/useSupabase';

const Game = ({ instanceId }: { instanceId: string }) => {
  const client = useSupabase();

  return (
    <GameBg
      board={<Gameboard />}
      leftTeam={0}
      rightTeam={0}
      overheadScore={0}
    />
  );
};

export default Game;
