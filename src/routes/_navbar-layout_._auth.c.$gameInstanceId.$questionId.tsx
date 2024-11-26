import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getInstanceGameQueryOptions } from '@/hooks/useinstancequeries';
import { gameQuestionsQueryOptions } from '@/hooks/usegamequeries';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { useInsertEvent } from '@/hooks/useeventqueries';
import { GameActions } from '@/types';
import QuestionPage from '@/components/gamecontrol/QuestionPage';
import { answersByQuestionIdQueryOptions } from '@/hooks/useanswerqueries';
import { getQuestionQueryOptions } from '@/hooks/usequestionqueries';

export const Route = createFileRoute(
  '/_navbar-layout/_auth/c/$gameInstanceId/$questionId',
)({
  loader: async ({ context: { queryClient }, params }) => {
    // const data = await queryClient.fetchQuery(
    // getInstanceGameQueryOptions(params.gameInstanceId),
    // );
    // const gameQuestionsQuery = queryClient.ensureQueryData(
    //   gameQuestionsQueryOptions(data?.games?.id || ''),
    // );
    const [questionQuery, answersQuery] = await Promise.all([
      queryClient.ensureQueryData(getQuestionQueryOptions(params.questionId)),
      queryClient.ensureQueryData(
        answersByQuestionIdQueryOptions(params.questionId),
      ),
    ]);
    return { questionQuery, answersQuery };
  },
  component: () => <Page />,
});

const Page = () => {
  const params = Route.useParams();
  return (
    <QuestionPage
      instanceId={params.gameInstanceId}
      questionId={params.questionId}
    />
  );
};
