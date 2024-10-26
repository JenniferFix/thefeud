'use client';
import useSupabase from '@/hooks/useSupabase';
import {
  getUsersQuestions,
  insertQuestion,
  updateQuestion,
  deleteQuestion,
} from '@/queries/questionqueries';
import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
} from '@tanstack/react-query';
import { Tables } from '@/types/supabase.types';
import { getSupabaseBrowserClient } from '@/utils/supabase/client';

const supabase = getSupabaseBrowserClient();

export function useGetUsersQuestions() {
  const client = useSupabase();
  const queryKey = ['questions'];

  const queryFn = async () => {
    return getUsersQuestions(client).then((result) => result?.data);
  };

  return useQuery({ queryKey, queryFn });
}
export const questionsQueryOptions = queryOptions({
  queryKey: ['questions'],
  queryFn: async () =>
    getUsersQuestions(supabase).then((result) => result.data),
});

export function useInsertQuestion() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async ({ question }: { question: string }) => {
    return insertQuestion(client, question).then((result) => result?.data);
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['questions'] });
  };

  return useMutation({ mutationFn, onSuccess });
}

export function useUpdateQuestion() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async ({
    questionId,
    question,
  }: {
    questionId: string;
    question: string;
  }) => {
    return updateQuestion(client, { id: questionId, question }).then(
      (result) => result?.data,
    );
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['questions'] });
  };
  return useMutation({ mutationFn, onSuccess });
}

export function useDeleteQuestion() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async ({ questionId }: { questionId: string }) => {
    return deleteQuestion(client, questionId).then((result) => result?.data);
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['questions'] });
  };

  return useMutation({ mutationFn, onSuccess });
}
