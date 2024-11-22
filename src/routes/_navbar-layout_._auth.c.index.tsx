import { createFileRoute } from '@tanstack/react-router';
import { gamesQueryOptions } from '@/hooks/usegamequeries';
import { getActiveInstancesQueryOptions } from '@/hooks/useinstancequeries';
import ControlIndex from '@/components/gamecontrol/ControlIndex';

// we need to list all of our games to start here
// as well as list already started games
export const Route = createFileRoute('/_navbar-layout/_auth/c/')({
  loader: async ({ context: { queryClient } }) => {
    const [gamesQuery, activeInstances] = await Promise.all([
      queryClient.ensureQueryData(gamesQueryOptions),
      queryClient.ensureQueryData(getActiveInstancesQueryOptions),
    ]);
    return { gamesQuery, activeInstances };
  },
  component: () => <ControlIndex />,
});
