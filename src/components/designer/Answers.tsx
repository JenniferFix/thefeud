'use client';
import React from 'react';
import {
  useDeleteAnswer,
  useGetAnswersByQuestionId,
  useInsertAnswer,
  useUpdateAnswerMutation,
} from '@/hooks/useanswerqueries';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Tables } from '@/types/supabase.types';
import { TrashIcon, PlusIcon } from '@radix-ui/react-icons';

type AnswerRow = Tables<'answers'>;

const answerSchema = z.object({
  answer: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  score: z.coerce.number().int().min(0).max(100),
});

const Answer = ({
  addAnswer,
  answer,
  questionid,
}: {
  addAnswer?: boolean;
  answer?: AnswerRow;
  questionid: string;
}) => {
  const deleteAnswer = useDeleteAnswer();
  const insertAnswer = useInsertAnswer();
  const updateAnswer = useUpdateAnswerMutation();

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: answer?.answer ?? '',
      score: answer?.score ?? 0,
    },
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    deleteAnswer.mutate(id);
  };

  const handleFormSubmit = (values: z.infer<typeof answerSchema>) => {
    console.log(values);
    insertAnswer.mutate({
      answer: values.answer,
      question_id: questionid,
      score: values.score,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="flex ">
          <FormField
            control={form.control}
            name={'answer'}
            render={({ field }) => (
              <Input className="m-1" placeholder="Answer..." {...field} />
            )}
          />
          <FormField
            control={form.control}
            name={'score'}
            render={({ field }) => (
              <Input maxLength={3} className="m-1 w-14" {...field} />
            )}
          />
          {answer ? (
            <Button
              size="icon"
              onClick={(e) => handleDelete(e, answer.id)}
              variant="ghost"
            >
              <TrashIcon />
            </Button>
          ) : (
            <Button size="icon" variant="ghost" type="submit">
              <PlusIcon />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

const Answers = ({ questionid }: { questionid: string }) => {
  const { isError, data, error, isLoading } =
    useGetAnswersByQuestionId(questionid);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(data?.length);
  return (
    <div>
      {data?.map((a: Tables<'answers'>) => (
        <Answer key={a.id} questionid={questionid} answer={a} />
      ))}
      {data && data.length < 8 && <Answer questionid={questionid} addAnswer />}
    </div>
  );
};

export default Answers;
