import React from 'react';
import Game from '@/components/show/Game';
import { createClient } from '@/utils/supabase/server';
import { getGameInstance } from '@/queries/instancequeries';
import { getEventsForGameInstance } from '@/queries/eventqueries';
import { getGameQuestions } from '@/queries/gamequeries';
import { Tables } from '@/types/supabase.types';
import { TGameQuestions } from '@/queries/gamequeries';

type TEvent = Tables<'game_events'>;
const GameLoader = async ({ instanceId }: { instanceId: string }) => {
  const client = createClient();

  const _instanceEvents = getEventsForGameInstance(client, instanceId);
  const _instanceData = getGameInstance(client, instanceId);
  const [instanceEvents, instanceDataRaw] = await Promise.all([
    _instanceEvents,
    _instanceData,
  ]);

  const { data: instanceData } = instanceDataRaw;

  const { data: gameQuestions } = await getGameQuestions(
    client,
    instanceData?.game!,
  );

  const typedGameQuestionData = gameQuestions as TGameQuestions;

  const typedInstanceData = instanceData as Tables<'game_instance'>;
  const typedEventData = instanceEvents.data as TEvent[];

  return <Game instanceData={typedInstanceData} initialData={typedEventData} />;
};

export default GameLoader;
