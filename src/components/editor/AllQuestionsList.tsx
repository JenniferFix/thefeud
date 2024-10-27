import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, Link } from '@tanstack/react-router';
import { questionsQueryOptions } from '@/hooks/usequestionqueries';
import Question from './Question';
import { useSupabaseAuth } from '@/supabaseauth';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@radix-ui/react-icons';
import { useNavigate } from '@tanstack/react-router';

const QuestionEditor = () => {
  const auth = useSupabaseAuth();
  const navigate = useNavigate();

  const questionsQuery = useSuspenseQuery(
    questionsQueryOptions(auth.user?.id!),
  );
  const questions = questionsQuery.data;

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
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                // TODO: Get delete code
              }}
            >
              <TrashIcon />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QuestionEditor;
