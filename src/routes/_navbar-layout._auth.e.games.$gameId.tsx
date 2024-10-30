import { createFileRoute } from '@tanstack/react-router'
import {
  gameQuestionsQueryOptions,
  getGameQueryOptions,
} from '@/hooks/usegamequeries'
import GameQuestionsPanel from '@/components/editor/GameQuestionsPanel'

export const Route = createFileRoute('/_navbar-layout/_auth/e/games/$gameId')({
  loader: async ({ context: { queryClient }, params: { gameId } }) => {
    const _gameQuestionsQuery = queryClient.ensureQueryData(
      gameQuestionsQueryOptions(gameId),
    )
    const _gameQuery = queryClient.ensureQueryData(getGameQueryOptions(gameId))
    const [gameQuestionsQuery, gameQuery] = await Promise.all([
      _gameQuestionsQuery,
      _gameQuery,
    ])
    return { gameQuestionsQuery, gameQuery }
  },
  component: () => <GameQuestionsPanel />,
})
