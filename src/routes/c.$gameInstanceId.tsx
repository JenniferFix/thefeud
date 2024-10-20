import { createFileRoute } from '@tanstack/react-router';
import GameInstanceControl from '@/components/gamecontrol/GameInstanceControl';

export const Route = createFileRoute('/c/$gameInstanceId')({
  component: ControlComponent,
});

function ControlComponent() {
  const gameInstanceId = Route.useParams().gameInstanceId;

  return <GameInstanceControl instanceId={gameInstanceId} />;
}
