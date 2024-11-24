import { createFileRoute } from '@tanstack/react-router';
import AnswerButtons from '@/components/gamecontrol/AnswerButtons';
import { getInstanceGameQueryOptions } from '@/hooks/useinstancequeries';
import { gameQuestionsQueryOptions } from '@/hooks/usegamequeries';

export const Route = createFileRoute(
  '/_navbar-layout/_auth/c/$gameInstanceId/$questionId',
)({
  loader: async ({ context: { queryClient }, params }) => {
    const data = await queryClient.fetchQuery(
      getInstanceGameQueryOptions(params.gameInstanceId),
    );
  },
  component: () => <Page />,
});

const Page = () => {
  const params = Route.useParams();
  return (
    <AnswerButtons
      instanceId={params.gameInstanceId}
      questionId={params.questionId}
    />
  );
};
