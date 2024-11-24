import { createFileRoute } from '@tanstack/react-router';
import {
  gameQuestionsQueryOptions,
  getGameQueryOptions,
} from '@/hooks/usegamequeries';
import GameQuestionsPanel from '@/components/editor/GameQuestionsPanel';

export const Route = createFileRoute('/_navbar-layout/_auth/e/games/$gameId')({
  loader: async ({ context: { queryClient }, params: { gameId } }) => {
    const [gameQuestionsQuery, gameQuery] = await Promise.all([
      queryClient.ensureQueryData(gameQuestionsQueryOptions(gameId)),
      queryClient.ensureQueryData(getGameQueryOptions(gameId)),
    ]);
    return { gameQuestionsQuery, gameQuery };
  },
  component: () => <GameQuestionsPanel />,
});
