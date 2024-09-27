'use client';
import React from 'react';
import GameBg from './GameBg';
import Gameboard from './Gameboard';
import { useGetEventsForGameInstance } from '@/hooks/useeventqueries';
import { useGetInstanceGame } from '@/hooks/useinstancequeries';
import { GameActions } from '@/types';
import useSupabase from '@/hooks/useSupabase';
import { Tables } from '@/types/supabase.types';

const Game = ({ instanceId }: { instanceId: string }) => {
  const client = useSupabase();
  const {
    data: instanceData,
    isLoading: isInstanceLoading,
    isError: isInstanceError,
    error: instanceError,
  } = useGetEventsForGameInstance(instanceId);
  const {
    data: gameData,
    isLoading: isGameLoading,
    isError: isGameError,
    error: gameError,
  } = useGetInstanceGame(instanceId);
  const [currentQuestion, setCurrentQuestion] = React.useState<string | null>(
    null,
  );
  const [answers, setAnswers] = React.useState([]);
  const [flippedAnswers, setFlippedAnswers] = React.useState([]);
  const [leftTeamScore, setLeftTeamScore] = React.useState(0);
  const [rightTeamScore, setRightTeamScore] = React.useState(0);
  const [upperScore, setUpperScore] = React.useState(0);

  React.useEffect(() => {
    const channel = client
      .channel('gameEvents')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'game_events',
        },
        (payload) => {
          console.log({ payload });
        },
      )
      .subscribe();
    return () => {
      client.removeChannel(channel);
    };
  }, [client]);

  if (isInstanceError || isGameError)
    return (
      <div>
        Error: {instanceError?.message}
        {gameError?.message}
      </div>
    );
  if (isInstanceLoading) return <div>Loading...</div>;
  if (!instanceData) return <div>No Data</div>;

  const getQuestion = (id: string) => {
    //
  };

  const parseGameData = () => {
    if (!instanceData) return;
    instanceData.forEach((i) => {
      switch (i.eventid) {
        case GameActions.StartQuestion:
          setCurrentQuestion(i.questionid);
          break;
        case GameActions.CorrectQuestion:
          break;
        case GameActions.IncorrectGuess:
          break;
        default:
        //
      }
    });
  };

  return (
    <GameBg
      board={<Gameboard />}
      leftTeam={leftTeamScore}
      rightTeam={rightTeamScore}
      overheadScore={upperScore}
    />
  );
};

export default Game;
