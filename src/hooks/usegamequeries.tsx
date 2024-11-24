'use client';
import useSupabase from '@/hooks/useSupabase';
import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
} from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import {
  getGame,
  getGames,
  getGameQuestions,
  addQuestionToGame,
  removeQuestionFromGame,
  insertGame,
  updateGame,
  deleteGame,
} from '@/queries/gamequeries';
import { getSupabaseBrowserClient } from '@/utils/supabase/client';

type QueryError = {
  message: string;
  originalError: PostgrestError;
};

const handQueryError = (error: PostgrestError): QueryError => ({
  message: error.message || 'An error occurred while fetching data',
  originalError: error,
});

const supabase = getSupabaseBrowserClient();

export const getGameQueryOptions = (gameId: string) =>
  queryOptions({
    queryKey: ['game', gameId],
    queryFn: async () =>
      getGame(supabase, gameId).then((result) => result?.data),
  });

export function useGetGames() {
  const client = useSupabase();
  const queryKey = ['games'];
  const queryFn = async () => {
    return getGames(client).then((result) => result?.data);
  };
  return useQuery({ queryKey, queryFn });
}
// const client = useSupabase();
//
export const gamesQueryOptions = queryOptions({
  queryKey: ['games'],
  queryFn: async () => getGames(supabase).then((result) => result?.data),
});

export function useGetGameQuestions(gameId: string) {
  const client = useSupabase();
  const queryKey = ['gamequestions', gameId];
  const queryFn = async () => {
    try {
      const query = await getGameQuestions(client, gameId).then(
        (result) => result?.data,
      );
      return query;
    } catch (error) {
      throw handQueryError(error as PostgrestError);
    }
  };
  return useQuery({ queryKey, queryFn });
}

export const gameQuestionsQueryOptions = (gameid: string) =>
  queryOptions({
    queryKey: ['gamequestions', gameid],
    queryFn: async () =>
      getGameQuestions(supabase, gameid).then((result) => result.data),
  });

export function useAddQuestionToGame(gameId: string) {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const queryKey = ['gamequestions', gameId];
  const mutationFn = async ({ questionId }: { questionId: string }) => {
    return addQuestionToGame(client, questionId, gameId);
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey });
  };
  return useMutation({ mutationFn, onSuccess });
}

export function useRemoveQuestionFromGame(gameId: string) {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const queryKey = ['gamequestions', gameId];
  const mutationFn = async ({ questionId }: { questionId: string }) => {
    return removeQuestionFromGame(client, questionId, gameId);
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey });
  };
  return useMutation({ onSuccess, mutationFn });
}

export function useInsertGame() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async ({ name }: { name: string }) => {
    return insertGame(client, name);
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['games'] });
  };

  return useMutation({ mutationFn, onSuccess });
}

export function useUpdateGame() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async ({
    gameId,
    name,
  }: {
    gameId: string;
    name: string;
  }) => {
    return updateGame(client, gameId, name);
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['games'] });
  };

  return useMutation({ mutationFn, onSuccess });
}

export function useDeleteGame() {
  const client = useSupabase();
  const queryClient = useQueryClient();
  //
  const mutationFn = async ({ gameId }: { gameId: string }) => {
    return deleteGame(client, gameId);
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['games'] });
  };

  return useMutation({ mutationFn, onSuccess });
}
