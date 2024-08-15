'use client';
import useSupabase from '@/hooks/useSupabase';
import { getUsersQuestions, updateQuestion } from '@/queries/question_queries';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAnswersByQuestionId,
  updateAnswer,
  insertAnswer,
  deleteAnswer,
} from '@/queries/answerqueries';
import type { Database, Tables } from '@/types/supabase.types';

export function useGetAnswersByQuestionId(questionid: string) {
  const client = useSupabase();
  const queryKey = ['answers', questionid];

  const queryFn = async () => {
    return getAnswersByQuestionId(client, questionid).then(
      (result) => result?.data,
    );
  };

  return useQuery({ queryKey, queryFn });
}

export function useUpdateAnswerMutation(
  answerid: string,
  answer: string,
  score: number,
) {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async () => {
    return updateAnswer(client, { id: answerid, answer, score }).then(
      (result) => result?.data,
    );
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['answers'] });
    queryClient.invalidateQueries({ queryKey: ['answer', answerid] });
  };
  return useMutation({ mutationFn, onSuccess });
}

export function useInsertAnswer() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (
    data: Database['public']['Tables']['answers']['Insert'],
  ) => {
    return insertAnswer(client, data).then((result) => result?.data);
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['answers'] });
  };

  return useMutation({ mutationFn, onSuccess });
}

export function useDeleteAnswer() {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const mutationFn = async (id: string) => {
    return deleteAnswer(client, id).then((result) => result?.data);
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['answers'] });
  };
  return useMutation({ mutationFn, onSuccess });
}
