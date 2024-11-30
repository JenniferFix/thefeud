import React from 'react';
import useSupabase from '@/hooks/useSupabase';
import { useGetInstanceGame } from '@/hooks/useinstancequeries';
import { useGetEventsForGameInstance } from '@/hooks/useeventqueries';
import { getAnswersByQuestionId } from '@/queries/answerqueries';
import { getQuestionFromId } from '@/queries/questionqueries';
import { Tables } from '@/types/supabase.types';
// import { type TGameQuestions } from '@/queries/gamequeries';
import { GameActions, IAnswered } from '@/types';
import useSound from 'use-sound';
import { useTimer } from 'react-timer-hook';
import { useInsertEvent, useDeleteEvent } from '@/hooks/useeventqueries';
import { Database } from '@/types/supabase.types';

type TEvents = Tables<'game_events'>;

type Props = {
  instanceId: string;
  sound?: boolean;
};

export default function useGameEvents(props: Props) {
  const supabaseClient = useSupabase();
  const insertEventHook = useInsertEvent(props.instanceId);
  const deleteEventHook = useDeleteEvent(props.instanceId);

  const {
    data: initialData,
    isLoading: isInitialLoading,
    isError: isInitialError,
    // error: initialError,
  } = useGetEventsForGameInstance(props.instanceId);

  const {
    data: gameData,
    isLoading: isGameLoading,
    isError: isGameError,
    error: gameError,
  } = useGetInstanceGame(props.instanceId);

  const [playSounds, setPlaySounds] = React.useState<boolean>(
    props?.sound ?? true,
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [events, setEvents] = React.useState(initialData);
  const [currentQuestionId, setCurrentQuestionId] = React.useState<
    string | undefined
  >();
  const [currentQuestionText, setCurrentQuestionText] = React.useState<
    string | undefined
  >();
  const [answers, setAnswers] = React.useState<Tables<'answers'>[]>([]);
  const [answered, setAnswered] = React.useState<IAnswered>({});
  const [leftTeamScore, setLeftTeamScore] = React.useState(0);
  const [rightTeamScore, setRightTeamScore] = React.useState(0);
  const [roundScore, setRoundScore] = React.useState(0);
  const [strikes, setStrikes] = React.useState(0);
  const [showStrike, setShowStrike] = React.useState(false);

  React.useEffect(() => {
    if (initialData && !isInitialLoading && !isInitialError) {
      setEvents(initialData);
    }
  }, [initialData, isInitialLoading, isInitialError]);

  const { isRunning, restart } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
  });

  React.useEffect(() => {
    setIsLoading(isInitialLoading && isGameLoading && Boolean(events));
  }, [isInitialLoading, isGameLoading, events]);

  React.useEffect(() => {
    if (isRunning) {
      setShowStrike(true);
    } else {
      setShowStrike(false);
    }
  }, [isRunning, setShowStrike]);

  const [dingSound] = useSound(
    'https://utfs.io/f/H6iSz68ZupCoYLk2Vwhdq2xsSpPTCoOnh5XK83a70LRkiGEt',
    { format: 'mp3' },
  );
  const [strikeSound] = useSound(
    'https://utfs.io/f/H6iSz68ZupCoMbf0C2NhZrC7uiAx6FkNYzDa84bnsqyKpdQB',
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

  const broadcastChannel = supabaseClient.channel(props.instanceId);

  React.useEffect(() => {
    const handleSoundPlay = (sound: string) => {
      switch (sound) {
        case 'ding':
          if (playSounds) dingSound();
          break;
        case 'strike':
          if (playSounds) strikeSound();
          break;
        case 'faceOffMusic':
          if (playSounds) faceOffMusic();
          break;
        case 'faceOffBuzzer':
          if (playSounds) faceOffBuzzer();
          break;
        case 'themeMusic':
          if (playSounds) themeMusic();
          break;
        case 'clap':
          if (playSounds) clap();
          break;
        default:
        //
      }
    };

    const channel = supabaseClient
      .channel(props.instanceId)
      .on('broadcast', { event: 'sound' }, (retData) => {
        const { event, payload } = retData;
        handleSoundPlay(payload.sound);
      })
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [
    playSounds,
    broadcastChannel,
    supabaseClient,
    props.instanceId,
    clap,
    dingSound,
    themeMusic,
    strikeSound,
    faceOffMusic,
    faceOffBuzzer,
  ]);

  React.useEffect(() => {
    if (!currentQuestionId) return;
    const getData = async () => {
      const { data, error } = await getAnswersByQuestionId(
        supabaseClient,
        currentQuestionId,
      );
      return data;
    };

    getData().then((value) => {
      setAnswers(value as Tables<'answers'>[]);
    });
  }, [currentQuestionId, supabaseClient]);

  React.useEffect(() => {
    if (!currentQuestionId) return;
    const getQuestion = async () => {
      const { data } = await getQuestionFromId(
        supabaseClient,
        currentQuestionId,
      );
      return data;
    };
    getQuestion().then((value) => {
      setCurrentQuestionText(value?.question as string);
    });
  }, [currentQuestionId, supabaseClient]);

  React.useEffect(() => {
    if (!events) return;
    const channel = supabaseClient
      .channel('gameEvents')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'game_events',
          filter: `instanceid=eq.${props.instanceId}`,
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

    const handleShowStrike = () => {
      const time = new Date();
      time.setMilliseconds(time.getMilliseconds() + 1500);
      restart(time);
    };

    console.log('main calculate useEffect', events);

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
    if (lastQuestion !== currentQuestionId) setCurrentQuestionId(lastQuestion);
    if (roundPoints !== roundScore) setRoundScore(roundPoints);
    if (teamAPoints !== leftTeamScore) setLeftTeamScore(teamAPoints);
    if (teamBPoints !== rightTeamScore) setRightTeamScore(teamBPoints);
    if (strikeCounter !== strikes) setStrikes(strikeCounter);

    if (lastEventType) {
      switch (lastEventType) {
        case GameActions.StartQuestion:
          setCurrentQuestionId(events.at(-1)?.questionid!);
          if (playSounds) themeMusic();
          break;
        case GameActions.CorrectAnswer:
          if (playSounds) dingSound();
          break;
        case GameActions.Strike:
          if (playSounds) strikeSound();
          handleShowStrike();
          break;
        case GameActions.TeamWin:
          if (playSounds) clap();
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
    currentQuestionId,
    strikes,
    playSounds,
    restart,
    strikeSound,
    dingSound,
    themeMusic,
    clap,
  ]);

  type InsertType = Database['public']['Tables']['game_events']['Insert'] &
    Omit<
      Database['public']['Tables']['game_events']['Insert'],
      Database['public']['Tables']['game_events']['Insert']['instanceid']
    >;
  const insertEvent = ({ eventid }: InsertType) => {
    insertEventHook.mutate({
      instanceid: props.instanceId,
      eventid,
    });
  };

  // const eventUndo = React.useMemo(() => {
  //   const lastEvent = events?.at(-1);
  //   if (!lastEvent || !events) return;
  //   deleteEventHook.mutate(lastEvent.id);
  //   setEvents(events.slice(0, -1));
  // }, [events]);

  const eventUndo = () => {
    const lastEvent = events?.at(-1);
    if (!lastEvent || !events) return;
    deleteEventHook.mutate(lastEvent.id);
    setEvents(events.slice(0, -1));
  };

  return {
    isLoading,
    leftTeamScore,
    rightTeamScore,
    roundScore,
    showStrike,
    strikes,
    answers,
    answered,
    currentQuestion: currentQuestionId,
    currentQuestionText,
    insertEvent,
    eventUndo,
  };
}
