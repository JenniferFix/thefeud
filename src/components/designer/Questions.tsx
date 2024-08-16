'use client';
import React from 'react';
import { useGetUsersQuestions } from '@/hooks/usequestionqueries';
import Question from './Question';

const Questions = () => {
  const { isError, data, error, isLoading } = useGetUsersQuestions();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  console.log(data);

  return data?.map((q) => (
    <Question key={q.id} id={q.id} text={q.question ?? ''} />
  ));
};

export default Questions;
