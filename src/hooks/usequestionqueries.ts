'use client';
import useSupabase from '@/hooks/useSupabase';
import { getUsersQuestions, updateQuestion } from '@/queries/question_queries';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useGetUsersQuestions() {
  const client = useSupabase();
  const queryKey = ['questions'];

  const queryFn = async () => {
    return getUsersQuestions(client).then((result) => result?.data);
  };

  return useQuery({ queryKey, queryFn });
}

export function useUpdateQuestionMutation(
  questionId: string,
  question: string,
) {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async () => {
    return updateQuestion(client, { id: questionId, question }).then(
      (result) => result?.data,
    );
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['questions'] });
  };
  return useMutation({ mutationFn, onSuccess });
}
