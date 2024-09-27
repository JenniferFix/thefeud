import Game from '@/components/Game';
export default function Home({ params }: { params: { id: string } }) {
  return <Game instanceId={params.id} />;
}
