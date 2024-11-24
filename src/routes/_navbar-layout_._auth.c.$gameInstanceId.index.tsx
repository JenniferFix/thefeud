import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { gameQuestionsQueryOptions } from '@/hooks/usegamequeries';
import { getInstanceGameQueryOptions } from '@/hooks/useinstancequeries';
import QuestionSelector from '@/components/gamecontrol/QuestionSelector';

import { useGetInstanceGame } from '@/hooks/useinstancequeries';
export const Route = createFileRoute(
  '/_navbar-layout/_auth/c/$gameInstanceId/',
)({
  loader: async ({ context, context: { queryClient }, params }) => {
    const instanceGameQuery = await queryClient.fetchQuery(
      getInstanceGameQueryOptions(params.gameInstanceId),
    );
    const gameQuestionsQuery = await queryClient.ensureQueryData(
      gameQuestionsQueryOptions(instanceGameQuery?.games?.id || ''),
    );
    return gameQuestionsQuery;
  },
  component: () => <Page />,
});

const Page = () => {
  const params = Route.useParams();
  const { data, isError, error, isLoading } = useSuspenseQuery(
    getInstanceGameQueryOptions(params.gameInstanceId),
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error?.message}</div>;
  return (
    <QuestionSelector
      gameId={data?.games?.id || ''}
      instanceId={params.gameInstanceId}
    />
  );
};
