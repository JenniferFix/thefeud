import React from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  TrashIcon,
  PlusIcon,
  DashIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import Answers from './Answers';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Tables } from '@/types/supabase.types';
import { useEditorStore } from '@/store';
import {
  useInsertQuestion,
  useUpdateQuestion,
  useDeleteQuestion,
} from '@/hooks/usequestionqueries';

type TQuestionRow = Tables<'questions'>;

const questionSchema = z.object({
  question: z.string().min(2, {
    message: 'Question length must be at least 2 characters.',
  }),
});

const Question = ({
  id,
  text,
  addQuestion,
}: {
  id?: string;
  text?: string;
  addQuestion?: boolean;
}) => {
  const deleteQuestion = useDeleteQuestion();
  const updateQuestion = useUpdateQuestion();
  const insertQuestion = useInsertQuestion();

  const currentSelection = useEditorStore(
    (state) => state.editorSelectedFromAllQuestions,
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    values: {
      question: text ?? '',
    },
  });

  const handleSubmit = (values: z.infer<typeof questionSchema>) => {
    if (!addQuestion) return;
    insertQuestion.mutate({ question: values?.question });
    form.reset();
  };

  const handleBlur = (values: z.infer<typeof questionSchema>) => {
    if (addQuestion) return;
    if (!form.formState.isDirty) return;
    updateQuestion.mutate({ questionId: id!, question: values.question });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteQuestion.mutate({ questionId: id! });
  };

  const selected = id === currentSelection;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full px-3">
      <div className="flex justify-between items-center w-full py-1">
        {!addQuestion && (
          <ToggleGroupItem value={id!} className="rounded-none rounded-l-md">
            {selected ? <CheckIcon className="text-4xl" /> : <DashIcon />}
          </ToggleGroupItem>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            onBlur={form.handleSubmit(handleBlur)}
            className="w-full flex"
          >
            <FormField
              control={form.control}
              name={'question'}
              render={({ field }) => (
                <Input className="w-full" placeholder="Question" {...field} />
              )}
            />
            {!addQuestion ? (
              <React.Fragment>
                <Button size="icon" variant="ghost" onClick={handleDelete}>
                  <TrashIcon />
                </Button>
                <CollapsibleTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-none rounded-r-md"
                  >
                    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </Button>
                </CollapsibleTrigger>
              </React.Fragment>
            ) : (
              <Button type="submit" size="icon" variant="ghost">
                <PlusIcon />
              </Button>
            )}
          </form>
        </Form>
      </div>
      {!addQuestion && (
        <CollapsibleContent className="pl-6 pr-3 mt-3">
          <Answers questionid={id!} />
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

export default Question;
