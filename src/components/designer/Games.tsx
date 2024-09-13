'use client';
import React from 'react';
import { useGetGames } from '@/hooks/usegamequeries';
import { useFeudStore } from '@/store';

const Games = () => {
  const { data, isError, isLoading, error } = useGetGames();
  const updateSelectedGame = useFeudStore((state) => state.updateSelectedGame);

  // just call it with the new state passed in

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  console.log(data);

  return data?.map((item) => (
    <div key={item.id}>
      <div>{item.name}</div>
    </div>
  ));
};
export default Games;
