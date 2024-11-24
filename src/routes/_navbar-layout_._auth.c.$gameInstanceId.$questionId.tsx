import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_navbar-layout/_auth/c/$gameInstanceId/$questionId',
)({
  component: () => (
    <div>Hello /_navbar-layout/_auth/c/$gameInstanceId/$questionId!</div>
  ),
})
