'use client';
import React from 'react';
import useSupabase from '@/hooks/useSupabase';
import { Database } from '@/types/supabase.types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlayIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const ActiveGames = ({ userid }: { userid?: string }) => {
  const supabase = useSupabase();
  const [activeGames, setActiveGames] = React.useState<
    Database['public']['Views']['active_games']['Row'][] | null
  >();

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
        .from('active_games')
        .select('*')
        .order('created_at');
      setActiveGames(data);
    };
    getData();
  }, [supabase]);
  // const typedData: Tables<'game_instance'>[] = data;

  return (
    <ScrollArea className="h-[200px]">
      {activeGames?.map((d) => (
        <div key={d.id}>
          <Button variant="link" asChild>
            <Link href={`/g/${d.id}`}>
              {d.name} started {new Date(d.created_at!).toLocaleString()}
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
