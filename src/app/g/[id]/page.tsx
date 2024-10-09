import GameLoader from '@/components/show/GameLoader';
import Game from '@/components/show/Game';
export default function Home({ params }: { params: { id: string } }) {
  return <Game instanceId={params.id} />;
}
