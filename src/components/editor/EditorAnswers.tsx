'use client';
import React from 'react';
import {
  useDeleteAnswer,
  useGetAnswersByQuestionId,
  useInsertAnswer,
  useUpdateAnswerMutation,
} from '@/hooks/useanswerqueries';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Tables } from '@/types/supabase.types';
import { TrashIcon, PlusIcon } from '@radix-ui/react-icons';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { answersByQuestionIdQueryOptions } from '@/hooks/useanswerqueries';
import { cn } from '@/utils/utils';

type AnswerRow = Tables<'answers'>;

const answerSchema = z.object({
  answer: z.string(),
  score: z.coerce.number().int().min(0).max(100),
});

const Answer = ({
  add,
  answer,
  questionid,
}: {
  add?: boolean;
  answer?: AnswerRow;
  questionid: string;
}) => {
  const deleteAnswer = useDeleteAnswer();
  const insertAnswer = useInsertAnswer();
  const updateAnswer = useUpdateAnswerMutation();

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    values: {
      answer: answer?.answer ?? '',
      score: answer?.score ?? 0,
    },
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    deleteAnswer.mutate(id);
  };

  const handleFormSubmit = (values: z.infer<typeof answerSchema>) => {
    if (!form.formState.isDirty) return;
    if (add) {
      insertAnswer.mutate({
        answer: values.answer,
        question_id: questionid,
        score: values.score,
      });
    } else {
      updateAnswer.mutate({
        id: answer?.id!,
        data: {
          answer: values.answer,
          score: values.score,
        },
      });
    }
    form.reset();
  };

  return (
    <div className="flex w-full items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          onBlur={form.handleSubmit(handleFormSubmit)}
          className={cn('w-full flex items-center gap-2', add && 'pb-4')}
        >
          <FormField
            control={form.control}
            name={'answer'}
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input variant="list" placeholder="Answer..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'score'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    variant="list"
                    size={2}
                    maxLength={3}
                    className=""
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {!answer ? (
            <Button size="icon" variant="ghost" type="submit">
              <PlusIcon />
            </Button>
          ) : (
            <Button
              size="icon"
              onClick={(e) => handleDelete(e, answer.id)}
              variant="ghost"
            >
              <TrashIcon />
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

const Answers = () => {
  const params = useParams({
    from: '/_navbar-layout/_auth/e/questions/$questionId',
  });
  const questionId = params.questionId;
  const answerQuery = useSuspenseQuery(
    answersByQuestionIdQueryOptions(questionId),
  );
  const answers = answerQuery.data;

  return (
    <section className="flex flex-col justify-between h-full pt-2 px-2">
      <ScrollArea className="flex flex-col justify-start h-full">
        {answers?.map((a) => (
          <Answer key={a.id} questionid={questionId} answer={a} />
        ))}
      </ScrollArea>
      {answers && answers.length < 8 ? (
        <Answer questionid={questionId} add />
      ) : (
        <div>Only 8 answers</div>
      )}
    </section>
  );
};

export default Answers;
