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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Tables } from '@/types/supabase.types';
import { TrashIcon, PlusIcon } from '@radix-ui/react-icons';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { answersByQuestionIdQueryOptions } from '@/hooks/useanswerqueries';

type AnswerRow = Tables<'answers'>;

const answerSchema = z.object({
  answer: z.string(),
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
    values: {
      answer: answer?.answer ?? '',
      score: answer?.score ?? 0,
    },
  });

  const { register } = form;

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    deleteAnswer.mutate(id);
  };

  const handleFormSubmit = (values: z.infer<typeof answerSchema>) => {
    if (!form.formState.isDirty) return;
    if (addAnswer) {
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

  const AddForm = ({ children }: { children: React.ReactNode }) => {
    <form>{children}</form>;
  };

  return (
    <div className="flex w-full">
      <Form {...form}>
        <form
          className="w-full"
          onSubmit={form.handleSubmit(handleFormSubmit)}
          onBlur={form.handleSubmit(handleFormSubmit)}
        >
          <div className="flex w-full">
            <FormField
              control={form.control}
              name={'answer'}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="m-1 w-full"
                      placeholder="Answer..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'score'}
              render={({ field }) => (
                <FormItem className="w-14">
                  <FormControl>
                    <Input maxLength={3} className="m-1" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {!answer && (
              <Button size="icon" variant="ghost" type="submit">
                <PlusIcon />
              </Button>
            )}
          </div>
        </form>
      </Form>
      {answer && (
        <Button
          size="icon"
          onClick={(e) => handleDelete(e, answer.id)}
          variant="ghost"
        >
          <TrashIcon />
        </Button>
      )}
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
    <div>
      {answers?.map((a) => (
        <Answer
          key={a.id}
          questionid={questionId}
          answer={a}
          addAnswer={false}
        />
      ))}
      {answers && answers.length < 8 && (
        <Answer questionid={questionId} addAnswer />
      )}
    </div>
  );
};

export default Answers;
