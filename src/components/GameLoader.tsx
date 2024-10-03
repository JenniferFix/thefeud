import React from 'react';
import Game from './Game';
import { createClient } from '@/utils/supabase/server';

import { Tables } from '@/types/supabase.types';
type TEvent = Tables<'game_events'>;
const GameLoader = async ({ instanceId }: { instanceId: string }) => {
  const client = createClient();
  const { data, error } = await client
    .from('game_events')
    .select('*')
    .eq('instanceid', instanceId);

  const typedData = data as TEvent[];

  return <Game instanceId={instanceId} initialData={typedData} />;
};

export default GameLoader;
