'use client';
import React from 'react';
import GameBg from '@/components/show/GameBg';
import Gameboard from './Gameboard';
import { useGetEventsForGameInstance } from '@/hooks/useeventqueries';
import { useGetInstanceGame } from '@/hooks/useinstancequeries';
import { getAnswersByQuestionId } from '@/queries/answerqueries';
import { GameActions } from '@/types';
import useSupabase from '@/hooks/useSupabase';
import { Tables } from '@/types/supabase.types';
import { type TGameQuestions } from '@/queries/gamequeries';
import useSound from 'use-sound';
type TEvents = Tables<'game_events'>;

const Game = ({
  instanceData,
  initialData,
}: {
  instanceData: Tables<'game_instance'>;
  initialData: TEvents[];
}) => {
  const supabaseClient = useSupabase();
  const {
    data: gameData,
    isLoading: isGameLoading,
    isError: isGameError,
    error: gameError,
  } = useGetInstanceGame(instanceData.id);

  const [events, setEvents] = React.useState(initialData);

  const [currentQuestion, setCurrentQuestion] = React.useState<
    string | null | undefined
  >(null);
  const [answers, setAnswers] = React.useState<Tables<'answers'>[]>();
  const [leftTeamScore, setLeftTeamScore] = React.useState(0);
  const [rightTeamScore, setRightTeamScore] = React.useState(0);
  const [roundScore, setRoundScore] = React.useState(0);
  const [strikes, setStrikes] = React.useState(0);

  const [dingSound] = useSound('/sounds/ding.mp3');
  const [strikeSound] = useSound('/sounds/strike.mp3');
  const [faceOffMusic] = useSound('/sounds/face-off.mp3');
  const [faceOffBuzzer] = useSound('/sounds/face-off-buzzer.mp3');
  const [themeMusic] = useSound('/sounds/theme.mp3');

  const broadcastChannel = supabaseClient.channel(instanceData.id);

  const handleSoundPlay = (sound: string) => {
    switch (sound) {
      case 'ding':
        dingSound();
        break;
      case 'strike':
        strikeSound();
        break;
      case 'faceOffMusic':
        faceOffMusic();
        break;
      case 'faceOffBuzzer':
        faceOffBuzzer();
        break;
      case 'themeMusic':
        themeMusic();
        break;
      default:
      //
    }
  };
  React.useEffect(() => {
    const channel = supabaseClient
      .channel(instanceData.id)
      .on('broadcast', { event: 'sound' }, (retData) => {
        const { event, payload } = retData;
        handleSoundPlay(payload.sound);
      })
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [broadcastChannel, handleSoundPlay]);

  React.useEffect(() => {
    if (!currentQuestion) return;
    const getData = async () => {
      const { data, error } = await getAnswersByQuestionId(
        supabaseClient,
        currentQuestion,
      );
      return data;
    };

    getData().then((value) => {
      setAnswers(value as Tables<'answers'>[]);
    });
  }, [currentQuestion]);

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
          setEvents([...events!, payload.new as TEvents]);
        },
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [supabaseClient, events]);

  React.useEffect(() => {
    console.log('recalculating');
    let lastQuestion;
    let roundPoints = 0;
    let teamAPoints = 0;
    let teamBPoints = 0;
    let parseStrikes = 0;
    if (!events) return;
    events.forEach((i) => {
      switch (i.eventid) {
        case GameActions.StartQuestion:
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
  }, [
    events,
    leftTeamScore,
    rightTeamScore,
    roundScore,
    currentQuestion,
    strikes,
  ]);

  if (isGameLoading) return <div>Loading...</div>;
  if (!gameData) return <div>No Data</div>;

  return (
    <GameBg
      board={<Gameboard answers={answers} />}
      leftTeam={leftTeamScore}
      rightTeam={rightTeamScore}
      overheadScore={roundScore}
    />
  );
};

export default Game;
