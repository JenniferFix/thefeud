import React from 'react';
import { useGetGames } from '@/hooks/usegamequeries';
const Games = () => {
  const { data, isError, isLoading, error } = useGetGames();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  console.log(data);

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>
          <div>{item.name}</div>
        </div>
      ))}
    </div>
  );
};
export default Games;
