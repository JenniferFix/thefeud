'use client';
import React from 'react';
import { useGetUsersQuestions } from '@/hooks/usequestionqueries';

const QueryTest = ({ userid }: { userid: string }) => {
  const { isError, data, error, isLoading } = useGetUsersQuestions();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  // console.log(data);
  return (
    <div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default QueryTest;
