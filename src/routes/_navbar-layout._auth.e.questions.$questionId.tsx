import { createFileRoute } from '@tanstack/react-router';
import { answersByQuestionIdQueryOptions } from '@/hooks/useanswerqueries';
import EditorAnswers from '@/components/editor/EditorAnswers';
import { getQuestionQueryOptions } from '@/hooks/usequestionqueries';

export const Route = createFileRoute(
  '/_navbar-layout/_auth/e/questions/$questionId',
)({
  loader: async ({ context: { queryClient }, params: { questionId } }) => {
    const [questionQuery, answersQuery] = await Promise.all([
      queryClient.ensureQueryData(getQuestionQueryOptions(questionId)),
      queryClient.ensureQueryData(answersByQuestionIdQueryOptions(questionId)),
    ]);
    return { questionQuery, answersQuery };
  },
  component: () => <EditorAnswers />,
});
