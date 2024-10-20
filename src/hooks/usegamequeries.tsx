'use client';
import useSupabase from '@/hooks/useSupabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getGames,
  getGameQuestions,
  addQuestionToGame,
  removeQuestionFromGame,
  insertGame,
  updateGame,
  deleteGame,
} from '@/queries/gamequeries';

export function useGetGames() {
  const client = useSupabase();
  const queryKey = ['games'];
  const queryFn = async () => {
    return getGames(client).then((result) => result?.data);
  };
  return useQuery({ queryKey, queryFn });
}

export function useGetGameQuestions(gameId: string) {
  const client = useSupabase();
  const queryKey = ['questions', gameId];
  const queryFn = async () => {
    return getGameQuestions(client, gameId).then((result) => result?.data);
  };
  return useQuery({ queryKey, queryFn });
}

export function useAddQuestionToGame() {
  const client = useSupabase();
  const queryClient = useQueryClient();
  // const queryKey = ['gameQustions', gameId];
  const mutationFn = async ({
    questionId,
    gameId,
  }: {
    questionId: string;
    gameId: string;
  }) => {
    return addQuestionToGame(client, questionId, gameId);
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['questions'] });
  };
  return useMutation({ mutationFn, onSuccess });
}

export function useRemoveQuestionFromGame() {
  const client = useSupabase();
  const queryClient = useQueryClient();
  // const queryKey = ['gameQustions', gameId];
  const mutationFn = async ({
    questionId,
    gameId,
  }: {
    questionId: string;
    gameId: string;
  }) => {
    return removeQuestionFromGame(client, questionId, gameId);
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['questions'] });
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
