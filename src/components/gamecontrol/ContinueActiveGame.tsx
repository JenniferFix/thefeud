import React from 'react';
import { useGetUserInstances } from '@/hooks/useinstancequeries';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useSupabaseAuth } from '@/supabaseauth';
import { Link } from '@tanstack/react-router';
import { PlayIcon, TvIcon } from 'lucide-react';

const ContinueActiveGame = () => {
  const { user } = useSupabaseAuth();
  const { data, isLoading, error, isError } = useGetUserInstances(
    user?.id || '',
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (!data) return <div>data error</div>;
  return (
    <ScrollArea>
      {data.map((i) => (
        <div className="flex justify-between">
          <div className="grow">{i.games?.name}</div>
          <div className="flex justify-end">
            {new Date(i.created_at).toLocaleString('en-ca', {
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })}
          </div>
          <Link
            key={i.id}
            to={`/c/${i.id}`}
            className="px-2 py-1 hover:bg-accent/75"
          >
            <PlayIcon />
          </Link>
          <Link to={`/g/${i.id}`}>
            <TvIcon />
          </Link>
        </div>
      ))}
    </ScrollArea>
  );
};

export default ContinueActiveGame;
