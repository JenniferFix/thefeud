'use client';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlayIcon } from '@radix-ui/react-icons';
import { useGetActiveInstances } from '@/hooks/useinstancequeries';
import { Link } from '@tanstack/react-router';

const ActiveGames = ({ userid }: { userid?: string }) => {
  const { data, error, isError, isLoading } = useGetActiveInstances();
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ScrollArea className="h-[200px]">
      {data?.map((d) => (
        <div key={d.id}>
          <Button variant="link" asChild>
            <Link href={`/g/${d.id}`}>
              {d.games?.name} started {new Date(d.created_at!).toLocaleString()}
            </Link>
          </Button>
          {userid && userid === d.userid && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/c/${d.id}`}>
                <PlayIcon />
              </Link>
            </Button>
          )}
        </div>
      ))}
    </ScrollArea>
  );
};

export default ActiveGames;
