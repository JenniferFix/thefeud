import React from 'react';
import { useGetUsersGames } from '@/hooks/usegamequeries';

const Games = () => {
  const { data, error, isError, isLoading } = useGetUsersGames();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  console.log(data);
  return <div>Games</div>;
};

export default Games;
