import { createFileRoute } from '@tanstack/react-router';
import { getActiveInstancesQueryOptions } from '@/hooks/useinstancequeries';
import ContinueGamePage from '@/components/gamecontrol/ContinueGamePage';

export const Route = createFileRoute('/_navbar-layout/_auth/c/continue')({
  loader: async ({ context: { queryClient } }) =>
    await queryClient.ensureQueryData(getActiveInstancesQueryOptions),
  component: () => <ContinueGamePage />,
});
