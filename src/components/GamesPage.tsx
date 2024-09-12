'use client';
import React from 'react';
import { useGetGames } from '@/hooks/usegamequeries';
import Games from '@/components/designer/Games';

const GamesPage = () => {
  const { data, error, isLoading, isError } = useGetGames();

  return (
    <div>
      <Games />
    </div>
  );
};

export default GamesPage;
