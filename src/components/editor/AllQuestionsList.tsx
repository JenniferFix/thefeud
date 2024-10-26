import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, Link } from '@tanstack/react-router';
import { questionsQueryOptions } from '@/hooks/usequestionqueries';
import { useGetUsersQuestions } from '@/hooks/usequestionqueries';
import { useEditorStore } from '@/store';
import Question from './Question';
import { useSupabaseAuth } from '@/supabaseauth';

const QuestionEditor = () => {
  const auth = useSupabaseAuth();

  const questionsQuery = useSuspenseQuery(
    questionsQueryOptions(auth.user?.id!),
  );
  const questions = questionsQuery.data;
  console.log(questions);
  return (
    <div className="flex flex-col">
      {questions?.map((q) => (
        <div key={q.id}>
          <Link
            to={`/e/questions/${q.id}`}
            className="flex px-3 py-2 hover:underline underline-offset-4 hover:bg-accent/50"
            activeProps={{ className: 'bg-accent/75' }}
          >
            {q.question}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QuestionEditor;
