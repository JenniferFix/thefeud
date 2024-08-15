'use client';
import React from 'react';
import {
  useDeleteAnswer,
  useGetAnswersByQuestionId,
  useInsertAnswer,
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
  score: z.number().int().max(100),
});

const Answer = ({
  addAnswer,
  answer,
}: {
  addAnswer?: boolean;
  answer?: AnswerRow;
}) => {
  const deleteAnswer = useDeleteAnswer();

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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="p-1 flex ">
          <FormField
            control={form.control}
            name={'answer'}
            render={({ field }) => <Input placeholder="Answer..." {...field} />}
          />
          <FormField
            control={form.control}
            name={'score'}
            render={({ field }) => (
              <Input maxLength={3} className="w-14" {...field} />
            )}
          />
          {answer ? (
            <Button onClick={(e) => handleDelete(e, answer.id)} variant="ghost">
              <TrashIcon />
            </Button>
          ) : (
            <Button variant="ghost" type="submit">
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
      {data?.map((a: Tables<'answers'>) => <Answer key={a.id} answer={a} />)}
      {data && data.length < 8 && <Answer addAnswer />}
    </div>
  );
};

export default Answers;
