import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField } from '@/components/ui/form';
import { TrashIcon, PlusIcon, Pencil1Icon } from '@radix-ui/react-icons';
// import { useGetUsersQuestions } from '@/hooks/usequestionqueries';
import { useSupabaseAuth } from '@/supabaseauth';
import { Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { questionsQueryOptions } from '@/hooks/usequestionqueries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  useInsertQuestion,
  useUpdateQuestion,
  useDeleteQuestion,
} from '@/hooks/usequestionqueries';
import { Tables } from '@/types/supabase.types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/utils/utils';

type TQuestionRow = Tables<'questions'>;

const questionSchema = z.object({
  question: z.string(),
});

const Question = ({
  question,
  add,
}: {
  question?: TQuestionRow;
  add?: boolean;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const deleteQuestion = useDeleteQuestion();
  const updateQuestion = useUpdateQuestion();
  const insertQuestion = useInsertQuestion();
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    values: {
      question: question?.question ?? '',
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteQuestion.mutate({ questionId: question?.id! });
  };

  const handleSubmit = (values: z.infer<typeof questionSchema>) => {
    if (!add) return;
    insertQuestion.mutate({ question: values?.question });
    form.reset();
  };

  const handleBlur = (values: z.infer<typeof questionSchema>) => {
    if (add) return;
    if (!form.formState.isDirty) return;
    updateQuestion.mutate({
      questionId: question?.id!,
      question: values.question,
    });
  };

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="w-full flex items-center mx-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onBlur={form.handleSubmit(handleBlur)}
          className="w-full flex items-center gap-2"
        >
          {isEditing || add ? (
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <Input
                  {...field}
                  variant={add ? 'default' : 'list'}
                  className={cn('w-full', add ? 'm-2' : '')}
                  placeholder="Question"
                />
              )}
            />
          ) : (
            <Link
              to={`/e/questions/${question?.id}`}
              className="w-full flex items-center pl-2"
              activeProps={{ className: 'font-bold' }}
            >
              {question?.question}
            </Link>
          )}
          {!add ? (
            <div className="flex items-center">
              <Button size="icon" variant="ghost" onClick={handleEditing}>
                <Pencil1Icon />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleDelete}>
                <TrashIcon />
              </Button>
            </div>
          ) : (
            <Button type="submit" size="icon" variant="ghost">
              <PlusIcon />
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

const Questions = () => {
  const auth = useSupabaseAuth();
  const questionsQuery = useSuspenseQuery(
    questionsQueryOptions(auth.user?.id!),
  );
  const questions = questionsQuery.data;
  return (
    <div className="flex flex-col justify-between h-full w-full gap-1 pt-3 px-2">
      <ScrollArea className="flex flex-col justify-start h-full">
        {questions?.map((q) => <Question key={q.id} question={q} />)}
      </ScrollArea>
      <Question add />
    </div>
  );
};

export default Questions;
