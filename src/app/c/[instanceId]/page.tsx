import React from 'react';
import GameController from '@/components/gamecontrol/GameController';

const Page = ({ params }: { params: { instanceId: string } }) => {
  return <GameController instanceId={params.instanceId} />;
};

export default Page;
