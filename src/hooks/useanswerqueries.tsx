'use client';
import useSupabase from '@/hooks/useSupabase';
import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
} from '@tanstack/react-query';
import {
  getAnswersByQuestionId,
  updateAnswer,
  insertAnswer,
  deleteAnswer,
} from '@/queries/answerqueries';
import type { Database, Tables } from '@/types/supabase.types';
import { getSupabaseBrowserClient } from '@/utils/supabase/client';

const supabase = getSupabaseBrowserClient();

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

export const answersByQuestionIdQueryOptions = (questionId: string) =>
  queryOptions({
    queryKey: ['answers', questionId],
    queryFn: async () =>
      getAnswersByQuestionId(supabase, questionId).then(
        (result) => result.data,
      ),
  });

export function useUpdateAnswerMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async ({
    id,
    data,
  }: {
    id: string;
    data: Database['public']['Tables']['answers']['Update'];
  }) => {
    return updateAnswer(client, { id, data }).then((result) => result?.data);
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['answers'] });
    // queryClient.invalidateQueries({ queryKey: ['answer', answerid] });
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
  const mutationFn = async ({ id }: { id: string }) => {
    return deleteAnswer(client, id).then((result) => result?.data);
  };
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['answers'] });
  };
  return useMutation({ mutationFn, onSuccess });
}
