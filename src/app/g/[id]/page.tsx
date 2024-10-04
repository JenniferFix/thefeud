import GameLoader from '@/components/show/GameLoader';
export default function Home({ params }: { params: { id: string } }) {
  return <GameLoader instanceId={params.id} />;
}
