import { createFileRoute } from '@tanstack/react-router'
import { answersByQuestionIdQueryOptions } from '@/hooks/useanswerqueries'
import EditorAnswers from '@/components/editor/EditorAnswers'
import { getQuestionQueryOptions } from '@/hooks/usequestionqueries'

export const Route = createFileRoute(
  '/_navbar-layout/_auth/e/questions/$questionId',
)({
  loader: async ({ context: { queryClient }, params: { questionId } }) => {
    const _questionQuery = queryClient.ensureQueryData(
      getQuestionQueryOptions(questionId),
    )
    const _answersQuery = queryClient.ensureQueryData(
      answersByQuestionIdQueryOptions(questionId),
    )
    const [questionQuery, answersQuery] = await Promise.all([
      _questionQuery,
      _answersQuery,
    ])
    return { questionQuery, answersQuery }
  },
  component: () => <EditorAnswers />,
})
