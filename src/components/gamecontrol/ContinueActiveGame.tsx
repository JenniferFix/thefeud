import React from 'react';
import { useGetActiveInstances } from '@/hooks/useinstancequeries';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const ContinueActiveGame = () => {
  const { data, isLoading, error, isError } = useGetActiveInstances();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (!data) return <div>data error</div>;
  return (
    <div>
      <ScrollArea>
        {data.games.map((i) => (
          <div></div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ContinueActiveGame;
