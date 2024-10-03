import React from 'react';
import GameInstanceControl from '@/components/gamecontrol/GameInstanceControl';

const Page = ({ params }: { params: { instanceId: string } }) => {
  return <GameInstanceControl instanceId={params.instanceId} />;
};

export default Page;
