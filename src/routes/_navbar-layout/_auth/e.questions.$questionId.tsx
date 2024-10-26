import { createFileRoute } from '@tanstack/react-router';
import { answersByQuestionIdQueryOptions } from '@/hooks/useanswerqueries';
import EditorAnswers from '@/components/editor/EditorAnswers';

export const Route = createFileRoute(
  '/_navbar-layout/_auth/e/questions/$questionId',
)({
  loader: ({ context: { queryClient }, params: { questionId } }) =>
    queryClient.ensureQueryData(answersByQuestionIdQueryOptions(questionId)),
  component: () => <EditorAnswers />,
});
