'use client';
import React from 'react';
import GameBg from '@/components/show/GameBg';
import Gameboard from './Gameboard';
import Strike from './Strike';
import { useGetEventsForGameInstance } from '@/hooks/useeventqueries';
import { useGetInstanceGame } from '@/hooks/useinstancequeries';
import { getAnswersByQuestionId } from '@/queries/answerqueries';
import { GameActions, IAnswered } from '@/types';
import useSupabase from '@/hooks/useSupabase';
import { Tables } from '@/types/supabase.types';
import { type TGameQuestions } from '@/queries/gamequeries';
import useSound from 'use-sound';
import { argv0 } from 'process';

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
  const [answers, setAnswers] = React.useState<Tables<'answers'>[]>([]);
  const [answered, setAnswered] = React.useState<IAnswered>({});
  const [leftTeamScore, setLeftTeamScore] = React.useState(0);
  const [rightTeamScore, setRightTeamScore] = React.useState(0);
  const [roundScore, setRoundScore] = React.useState(0);
  const [strikes, setStrikes] = React.useState(0);
  const [showStrike, setShowStrike] = React.useState(false);

  const [dingSound] = useSound(
    'https://utfs.io/f/H6iSz68ZupCoYLk2Vwhdq2xsSpPTCoOnh5XK83a70LRkiGEt',
    { format: 'mp3' },
  );
  const [strikeSound] = useSound(
    'https://utfs.io/f/H6iSz68ZupCo4zydNCE9ulnKd6JjxQ1WkrV4qp5YX3oHg0wh',
    { format: 'mp3' },
  );
  const [faceOffMusic] = useSound(
    'https://utfs.io/f/H6iSz68ZupCo4eKhb35E9ulnKd6JjxQ1WkrV4qp5YX3oHg0w',
    { format: 'mp3' },
  );
  const [faceOffBuzzer] = useSound(
    'https://utfs.io/f/H6iSz68ZupCoAiLTGxMQAScDCsTuMnEmH91yakxB76plzKiq',
    { format: 'mp3' },
  );
  const [themeMusic] = useSound(
    'https://utfs.io/f/H6iSz68ZupCoNGkGGFloauFQZAbTpW4OP5hCSDJM6Igcj9r2',
    { format: 'mp3' },
  );
  const [clap] = useSound(
    'https://utfs.io/f/H6iSz68ZupCoI8HGXcx1w0amDS2udhsfqj97lFyLkcIAQCez',
    { format: 'mp3' },
  );

  const broadcastChannel = supabaseClient.channel(instanceData.id);

  React.useEffect(() => {
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
        case 'clap':
          clap();
          break;
        default:
        //
      }
    };
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
  }, [
    broadcastChannel,
    supabaseClient,
    instanceData.id,
    clap,
    dingSound,
    themeMusic,
    strikeSound,
    faceOffMusic,
    faceOffBuzzer,
  ]);

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
  }, [currentQuestion, supabaseClient]);

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
    if (!events) return;
    let lastQuestion;
    let roundPoints = 0;
    let teamAPoints = 0;
    let teamBPoints = 0;
    let strikeCounter = 0;
    let lastEventType: undefined | GameActions = undefined;
    let tempAnswered: IAnswered = {};

    events.forEach((i) => {
      lastEventType = i.eventid;
      switch (i.eventid) {
        case GameActions.StartQuestion:
          // TODO: First make sure the previous game, if one, had the points assigned to a team
          // lets see if the roundPoints are zero first
          lastQuestion = i.questionid;
          roundPoints = 0;
          strikeCounter = 0;
          tempAnswered = {};
          break;
        case GameActions.CorrectAnswer:
          tempAnswered[i.answerid!] = true;
          roundPoints += i.points ?? 0;
          break;
        case GameActions.Strike:
          strikeCounter++;
          break;
        case GameActions.TeamWin:
          if (i.team === 1) {
            teamAPoints += roundPoints;
          } else if (i.team === 2) {
            teamBPoints += roundPoints;
          }
          roundPoints = 0;
          break;
        default:
        //
      }
    });

    if (tempAnswered) setAnswered(tempAnswered);
    if (lastQuestion !== currentQuestion) setCurrentQuestion(lastQuestion);
    if (roundPoints !== roundScore) setRoundScore(roundPoints);
    // setRoundScore(roundPoints);
    if (teamAPoints !== leftTeamScore) setLeftTeamScore(teamAPoints);
    if (teamBPoints !== rightTeamScore) setRightTeamScore(teamBPoints);
    if (strikeCounter !== strikes) setStrikes(strikeCounter);

    if (lastEventType) {
      switch (lastEventType) {
        case GameActions.StartQuestion:
          setCurrentQuestion(events.at(-1)?.questionid);
          themeMusic();
          break;
        case GameActions.CorrectAnswer:
          dingSound();
          break;
        case GameActions.Strike:
          strikeSound();
          setShowStrike(true);
          break;
        case GameActions.TeamWin:
          clap();
          break;
        default:
          break;
      }
    }
  }, [
    events,
    leftTeamScore,
    rightTeamScore,
    roundScore,
    currentQuestion,
    strikes,
    strikeSound,
    dingSound,
    themeMusic,
    clap,
  ]);

  if (isGameLoading) return <div>Loading...</div>;
  if (!gameData) return <div>No Data</div>;

  return (
    <React.Fragment>
      <div>
        <GameBg
          board={<Gameboard answers={answers} answered={answered} />}
          leftTeam={leftTeamScore}
          rightTeam={rightTeamScore}
          overheadScore={roundScore}
        />
      </div>
      {showStrike && (
        <Strike count={strikes} timeoutCallback={() => setShowStrike(false)} />
      )}
    </React.Fragment>
  );
};

export default Game;
