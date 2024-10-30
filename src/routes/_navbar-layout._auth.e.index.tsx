import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_navbar-layout/_auth/e/')({
  loader: () => redirect({ to: '/e/games' }),
})
