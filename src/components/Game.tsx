'use client';
import React from 'react';
import GameBg from './GameBg';
import Gameboard from './Gameboard';
import { useGetEventsForGameInstance } from '@/hooks/useeventqueries';
import { useGetInstanceGame } from '@/hooks/useinstancequeries';
import { GameActions } from '@/types';
import useSupabase from '@/hooks/useSupabase';
import { Tables } from '@/types/supabase.types';
import { argv0 } from 'process';
type TEvents = Tables<'game_events'>;

const Game = ({
  instanceId,
  initialData,
}: {
  instanceId: string;
  initialData: TEvents[];
}) => {
  const supabaseClient = useSupabase();
  // const {
  //   data: eventData,
  //   isLoading: isEventsLoading,
  //   isError: isEventsError,
  //   error: eventsError,
  // } = useGetEventsForGameInstance(instanceId);
  const {
    data: gameData,
    isLoading: isGameLoading,
    isError: isGameError,
    error: gameError,
  } = useGetInstanceGame(instanceId);

  const [events, setEvents] = React.useState(initialData);

  const [currentQuestion, setCurrentQuestion] = React.useState<
    string | null | undefined
  >(null);
  const [answers, setAnswers] = React.useState([]);
  const [flippedAnswers, setFlippedAnswers] = React.useState([]);
  const [leftTeamScore, setLeftTeamScore] = React.useState(0);
  const [rightTeamScore, setRightTeamScore] = React.useState(0);
  const [roundScore, setRoundScore] = React.useState(0);
  const [strikes, setStrikes] = React.useState(0);

  React.useEffect(() => {
    const channel = supabaseClient
      .channel('gameEvents')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'game_events',
        },
        (payload) => {
          setEvents([...events!]);
          console.log(events);
          console.log(payload);
        },
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [supabaseClient]);

  if (isGameLoading) return <div>Loading...</div>;
  if (!gameData) return <div>No Data</div>;

  const parseGameData = () => {
    let lastQuestion;
    let roundPoints = 0;
    let teamAPoints = 0;
    let teamBPoints = 0;
    let parseStrikes = 0;
    if (!events) return;
    events.forEach((i) => {
      switch (i.eventid) {
        case GameActions.StartQuestion:
          // setCurrentQuestion(i.questionid);
          lastQuestion = i.questionid;
          break;
        case GameActions.CorrectAnswer:
          break;
        case GameActions.Strike:
          break;
        case GameActions.TeamWin:
          break;
        default:
        //
      }
    });
    if (lastQuestion !== currentQuestion) setCurrentQuestion(lastQuestion);
    if (roundPoints !== roundScore) setRoundScore(roundPoints);
    if (teamAPoints !== leftTeamScore) setLeftTeamScore(teamAPoints);
    if (teamBPoints !== rightTeamScore) setRightTeamScore(teamBPoints);
    if (parseStrikes !== strikes) setStrikes(parseStrikes);
  };

  return (
    <GameBg
      board={<Gameboard />}
      leftTeam={leftTeamScore}
      rightTeam={rightTeamScore}
      overheadScore={roundScore}
    />
  );
};

export default Game;
