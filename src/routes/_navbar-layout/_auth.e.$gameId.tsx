import { createFileRoute } from '@tanstack/react-router';
import { gameQuestionsQueryOptions } from '@/hooks/usegamequeries';
import GameQuestionsPanel from '@/components/editor/GameQuestionsPanel';

export const Route = createFileRoute('/_navbar-layout/_auth/e/$gameId')({
  loader: ({ context: { queryClient }, params: { gameId } }) =>
    queryClient.ensureQueryData(gameQuestionsQueryOptions(gameId)),
  component: () => <GameQuestionsPanel />,
});
