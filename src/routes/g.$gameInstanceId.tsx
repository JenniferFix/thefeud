import { createFileRoute } from '@tanstack/react-router';
import Game from '@/components/show/Game';

export const Route = createFileRoute('/g/$gameInstanceId')({
  component: ControlComponent,
});

function ControlComponent() {
  const gameInstanceId = Route.useParams().gameInstanceId;

  return <Game instanceId={gameInstanceId} />;
}
