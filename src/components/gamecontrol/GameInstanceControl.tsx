'use client';
import React from 'react';
import { useGetInstanceGame } from '@/hooks/useinstancequeries';
import { type TInstance } from '@/queries/instancequeries';
import GameControl from './GameControl';

const GameController = ({ instanceId }: { instanceId: string }) => {
  const { data, isLoading, isError, error } = useGetInstanceGame(instanceId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (!data) return <div>no data yet</div>;

  const typedData: TInstance = data;

  const gameId = typedData?.games?.id!;

  return <GameControl instanceId={instanceId} gameId={gameId} />;
};

export default GameController;
