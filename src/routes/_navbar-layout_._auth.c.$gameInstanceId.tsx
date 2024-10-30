import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getInstanceGameQueryOptions } from '@/hooks/useinstancequeries';
import GameControl from '@/components/gamecontrol/GameControl';

export const Route = createFileRoute('/_navbar-layout/_auth/c/$gameInstanceId')(
  {
    loader: async ({
      context: { queryClient },
      params: { gameInstanceId },
    }) => {
      const _instanceGame = queryClient.ensureQueryData(
        getInstanceGameQueryOptions(gameInstanceId),
      );
      const [instanceGame] = await Promise.all([_instanceGame]);
      return { instanceGame };
    },
    component: ControlComponent,
  },
);

function ControlComponent() {
  const gameInstanceId = Route.useParams().gameInstanceId;
  const instanceGameQuery = useSuspenseQuery(
    getInstanceGameQueryOptions(gameInstanceId),
  );
  const instanceGame = instanceGameQuery.data;

  return (
    <GameControl
      instanceId={gameInstanceId}
      gameId={instanceGame?.games?.id!}
    />
  );
}
