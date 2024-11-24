import { createFileRoute } from '@tanstack/react-router';
import { gamesQueryOptions } from '@/hooks/usegamequeries';
import NewGamePage from '@/components/gamecontrol/NewGamePage';

export const Route = createFileRoute('/_navbar-layout/_auth/c/new')({
  loader: async ({ context: { queryClient } }) =>
    await queryClient.ensureQueryData(gamesQueryOptions),
  component: () => <NewGamePage />,
});
