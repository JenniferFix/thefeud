'use server';
import { createClient } from '@/utils/supabase/server';
import { createGameInstance } from '@/queries/instancequeries';

export const createGameAction = async () => {
  const supabaseClient = createClient();
};
