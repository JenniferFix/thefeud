import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  TrashIcon,
  PlusIcon,
  Pencil1Icon,
  DashIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import { useGetUsersQuestions } from '@/hooks/usequestionqueries';
import { useSupabaseAuth } from '@/supabaseauth';
import { useParams, Link } from '@tanstack/react-router';
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

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteQuestion.mutate({ questionId: question?.id! });
  };

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onBlur={form.handleSubmit(handleBlur)}
          className="w-full flex items-center gap-2"
        >
          {isEditing || add ? (
            <FormField
              control={form.control}
              name={'question'}
              render={({ field }) => (
                <Input
                  variant="list"
                  className="w-full"
                  placeholder="Question"
                  {...field}
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
  return questions?.map((q) => <Question key={q.id} question={q} />);
};

const QuestionsPanel = () => {
  /* <div className="flex flex-col justify-apart h-full w-full p-1"> */
  return (
    <div className="h-full p-2">
      <Questions />
      <Question add />
    </div>
  );
  // </div>
};

export default QuestionsPanel;
